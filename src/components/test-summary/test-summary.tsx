
import React, { FC } from 'react';
import { TestCounts } from '../../models/test-count.model';
import styles from './test-summary.module.css';

type TestSummaryProps = {
    countDetails: TestCounts;
    isComplete: boolean
}

const TestSummary: FC<TestSummaryProps> = ({countDetails, isComplete}) => {
    return (
        <div className={styles.testSummaryContainer}>
            { 
                Object.keys(countDetails).map((key) => (
                    <React.Fragment key={key}>
                        <span className={styles.testName}>{key}: </span>
                        <span className={styles.testCount}>{countDetails[`${key}` as keyof TestCounts]}</span>
                    </React.Fragment>
                )) 
            }
            {
               isComplete && <span className={styles.checkmark}>Done &#10003;</span>
            }
        </div>
    )
}
export default TestSummary;
