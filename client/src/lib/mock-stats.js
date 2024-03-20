const applicationsOverTimeSeed = [
    { createdAt: '2024-03-10', applications: 1 },
    { createdAt: '2024-03-10', },
    { createdAt: '2024-03-10', },
    { createdAt: '2024-03-15', },
    { createdAt: '2024-03-15' },
    { createdAt: '2024-02-26' },
    { createdAt: '2024-01-30' },
    { createdAt: '2024-01-31' },
    { createdAt: '2024-01-30' },
    { createdAt: '2024-02-16' },
    { createdAt: '2024-02-08' },
    { createdAt: '2024-02-23' },
    { createdAt: '2024-02-01' },
    { createdAt: '2024-02-23' },
    { createdAt: '2024-02-27' },
    { createdAt: '2024-03-23' },
    { createdAt: '2024-03-23' },
    { createdAt: '2024-03-16' },
    { createdAt: '2024-03-05' },
    { createdAt: '2024-01-30' }
];
export const normalizedData = applicationsOverTimeSeed.map(item => {
    // If 'applications' key exists, increment it by 1. Otherwise, set it to 1.
    const applications = item.applications ? item.applications + 1 : 1;
    return { ...item, applications };
    });

    normalizedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));