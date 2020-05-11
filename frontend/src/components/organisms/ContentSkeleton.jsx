import React  from 'react';

import Card from '../organisms/Card';
import CardContent from '../organisms/CardContent';
import CardBody from '../organisms/CardBody';
import CardHeader from '../organisms/CardHeader';
import CardFooter from '../organisms/CardFooter';

const ContentSkeleton = () => {
    return (
        <div className='panel flex-expander master'>
            {
                [1,2,3,4].map(item => (
                    <div
                        className='resource'
                        key={item}
                    >
                        <Card>
                            <CardContent>
                                <CardHeader>
                                        <h3 className='h4'></h3>
                                </CardHeader>
                                <CardBody>
                                </CardBody>
                                <CardFooter>
                                    <p className={'h5'}></p>
                                </CardFooter>
                            </CardContent>
                        </Card>
                    </div>
                ))
            }
        </div>
    );
};

export default ContentSkeleton;