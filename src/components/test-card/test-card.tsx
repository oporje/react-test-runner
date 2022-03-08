
import React, { FC } from 'react';
import { TestStatus } from '../../enums/test-status';
import styles from './test-card.module.css';

type TestCardProps = {
    description: string;
    status: TestStatus
};

const TestCard: FC<TestCardProps> = ({ description, status }) => {
    return (<tbody>
                <tr> 
                    <td className={styles.description}> {description}</td> 
                    <td className={`${styles.status} ${styles[status]}`}>{status}</td> 
                </tr>
            </tbody>);
};


export default TestCard;
