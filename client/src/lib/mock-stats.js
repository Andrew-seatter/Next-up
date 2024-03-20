const applicationsOverTimeSeed = [
    { createdAt: '2022-05-10', applications: 1 },
    { createdAt: '2022-07-30', },
    { createdAt: '2022-09-03', },
    { createdAt: '2022-10-15', },
    { createdAt: '2022-03-05' },
    { createdAt: '2022-02-26' },
    { createdAt: '2022-06-30' },
    { createdAt: '2022-12-31' },
    { createdAt: '2022-05-30' },
    { createdAt: '2022-07-16' },
    { createdAt: '2022-09-08' },
    { createdAt: '2022-01-23' },
    { createdAt: '2022-01-01' },
    { createdAt: '2022-02-23' },
    { createdAt: '2022-06-27' },
    { createdAt: '2022-11-23' },
    { createdAt: '2022-08-23' },
    { createdAt: '2022-06-16' },
    { createdAt: '2022-07-05' },
    { createdAt: '2022-03-30' }
];
export const normalizedData = applicationsOverTimeSeed.map(item => {
    // If 'applications' key exists, increment it by 1. Otherwise, set it to 1.
    const applications = item.applications ? item.applications + 1 : 1;
    return { ...item, applications };
    });

    normalizedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));