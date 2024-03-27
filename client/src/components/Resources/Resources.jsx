import { Grid, Typography, Link, Card, CardContent } from '@mui/material';
import Sidebar from "../Navigation/Sidebar";
import { useMediaQuery, useTheme } from '@mui/material';
import MobileMenu from '../Navigation/MobileMenu';
import styles from '../Resources/Resources.module.css'


const resources = {
    'Resume Help': [
        { title: 'How to Make a Resume', url: 'https://www.indeed.com/career-advice/resumes-cover-letters/how-to-make-a-resume-with-examples' },
        { title: 'How to Write a Resume - The Complete Guide', url: 'https://novoresume.com/career-blog/how-to-write-a-resume-guide' },
        { title: 'Write an Incredible Resume - video', url: 'https://www.youtube.com/watch?v=Tt08KmFfIYQ' },
        { title: 'The Best Professional Summary Formula for Resume and LinkedIn', url: 'https://www.youtube.com/watch?v=Bip6BXtOQ_I' },
    ],
    'Interview Tips': [
        { title: '10 Common Job Interview Questions and How to Answer Them', url: 'https://hbr.org/2021/11/10-common-job-interview-questions-and-how-to-answer-them'},
        { title: 'How to Not Be Nervous in Job Interviews', url: 'https://www.youtube.com/watch?v=9FSSu8Ix0PA' },
        { title: 'Interview Questions and Answers: How to Ace an Interview', url: 'https://www.youtube.com/watch?v=TZ3C_syg9Ow' },
        { title: '6 Interview Skills That Will Get You Hired', url: 'https://www.linkedin.com/business/learning/blog/job-seeking-tips/6-interview-skills-that-will-get-you-hired-2023' },
    ],
    'Job Search Strategies': [
        { title: '9 Job Search Strategies to Help you Find your Dream Job', url: 'https://www.indeed.com/career-advice/finding-a-job/job-search-strategy'},
        { title: '15 Job Search Strategies that Work', url: 'https://www.forbes.com/sites/robinryan/2021/11/16/15-job-search-strategies-that-work/?sh=39ebcf785a08' },
        { title: 'How to Master Your Job Search', url: 'https://www.youtube.com/watch?v=h_04pmxmHQc' },
        { title: '3 Ideas for More Effective Job Hunting', url: 'https://www.youtube.com/watch?v=tVKfJ6z4fYg' },
    ],
    'Career Development': [
        { title: '12 tips for career development and advancement', url: 'https://www.intuit.com/blog/innovative-thinking/12-tips-for-career-development-and-advancement/'},
        { title: '5 Proven Strategies to Increase Your Visibility and Get Promoted At Work', url: 'https://www.youtube.com/watch?v=JFtKeKTpJo0' },
        { title: 'Your Career Path Does Not Have to Be a Straight Line', url: 'https://www.youtube.com/watch?v=oAgMKap9Cv8' },
        { title: 'How To Create A Career Development Plan', url: 'https://www.forbes.com/advisor/business/career-development-plan/' },
    ]
};

export const Resources = () => {
    const theme = useTheme();
    const MOBILE_BREAKPOINT = 'lg';
    const isMobile = useMediaQuery(theme.breakpoints.down(MOBILE_BREAKPOINT));
    
    return (
        <Grid container spacing={3} style={{ margin: "-17px" }}>
            {isMobile ? (
                <MobileMenu />
            ) : (
                <Grid item xs={2} className='sidebar-container'>
                    <Sidebar />
                </Grid>
            )}

            <Grid item xs={10} container spacing={2} className={styles.resourcesContainer}>
                {Object.entries(resources).map(([category, links]) => (
                    <Grid item xs={12} sm={6} key={category}>
                        <Card className={styles.resourceCard}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {category}
                                </Typography>
                                <ul className={styles.resourceList}>
                                    {links.map((link, index) => (
                                        <li key={index}>
                                            <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};


export default Resources;

