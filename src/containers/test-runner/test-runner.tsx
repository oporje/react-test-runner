
import React, { useState, FC, useEffect, ReactNode } from 'react';
import { tests } from  '../../input';
import { TestStatus } from '../../enums/test-status';
import TestCard from '../../components/test-card/test-card';
import TestSummary from '../../components/test-summary/test-summary';
import { TestCounts } from '../../models/test-count.model';
import Style from './test-runner.module.css';

type TestListItem = {
    status: TestStatus;
    description: string;
}

const TestRunner: FC = () => {
  const [testListItems, setTestListItems] = useState<TestListItem[]>([]);
  const [testCountSummary, setTestCountSummary] = useState<TestCounts>({
    total: tests?.length || 0,
    running: 0,
    passed: 0,
    failed: 0
  });

  useEffect(() => {
      initializeTests();
  }, []);

  // Assign not started status to all the tests
  const initializeTests = () => {
    const testsList: TestListItem[] = tests?.map((test) => {
        const testDetails = {
            status: TestStatus.NOT_STARTED,
            description: test.description
        }
        return testDetails;
    });
    setTestListItems(testsList);
  };

  const calculateStatusCount = (status: TestStatus): void => {
    switch(status) {
        case TestStatus.FAILED: 
            setTestCountSummary(prevState => ({
                ...prevState,
                failed: prevState.failed + 1,
                running: prevState.running - 1
            }));
            break;
        case TestStatus.PASSED: 
            setTestCountSummary(prevState => ({
                ...prevState,
                passed: prevState.passed + 1,
                running: prevState.running - 1
            }));
            break;
        case TestStatus.RUNNING:
            setTestCountSummary(prevState => ({
                ...prevState,
                running: tests?.length || 0
            }));
            break;
    }
  };

  // according to response from makeDummyTest update status
  const updateTestStatus = (status: boolean, index: number): void => {
    if (status) {
        calculateStatusCount(TestStatus.PASSED);
    } else {
        calculateStatusCount(TestStatus.FAILED);
    }

    setTestListItems((oldTestItems: TestListItem[]) => [
        ...oldTestItems.slice(0, index),
        {
            ...oldTestItems[index],
            status: status ? TestStatus.PASSED : TestStatus.FAILED
        },
        ...oldTestItems.slice(index + 1)
    ]); 
  };

  const runTests = (): void => {
    calculateStatusCount(TestStatus.RUNNING);
    const testsList = tests?.map((test, index) => {
        subscribeToTest(test.run, index);
        const testDetails = {
            status: TestStatus.RUNNING,
            description: test.description
        };
        return testDetails;
    });

    setTestListItems([...testsList]);
  };

  const subscribeToTest = (asyncAction: () => void, index: number): void => {
    new Promise(asyncAction)
        .then((testStatus) => {
            updateTestStatus(testStatus as boolean, index);
        }).catch(e => {
            // if error occurs - considering it as a failure
            updateTestStatus(false, index);
            console.error(e);
        });
  };

  const renderTestsWithStatus = () => testListItems.map(({description, status}): ReactNode => {
    return (<TestCard key={description} description={description} status={status}> </TestCard>)
  });

  return (
    <>
        <div className={Style.testSummaryContainer}>
            <button className={Style.runButton} onClick={runTests}> Run tests </button>
            <TestSummary 
                countDetails={testCountSummary} 
                isComplete={
                    testCountSummary['total'] === testCountSummary['passed'] + testCountSummary['failed'] 
                }
            />
        </div>
        <table className='test-details-container'>
            <thead> 
                <tr>
                    <th>
                        Description
                    </th>
                    <th>
                        Status
                    </th>
                </tr>
            </thead>
            { renderTestsWithStatus() }
        </table>
    </>
    );
}

export default TestRunner;
