import { Grid, Typography, Link } from '@mui/material';
import Sidebar from "../Navigation/Sidebar";
import { useMediaQuery, useTheme } from '@mui/material';
import MobileMenu from '../Navigation/MobileMenu';

const resources = {

    'Resume Help': [
        { title: 'How to Write a Resume - The Complete Guide', url: 'https://novoresume.com/career-blog/how-to-write-a-resume-guide' },

        // Placeholder Resources
        { title: 'Top Resume Mistakes to Avoid', url: 'https://example.com/resume-mistakes' },
        { title: 'Resume Formatting Best Practices', url: 'https://example.com/resume-formatting' },
        { title: 'Action Verbs to Make Your Resume Stand Out', url: 'https://example.com/action-verbs-resume' },
    ],
    'Interview Tips': [
        { title: '10 Common Job Interview Questions and How to Answer Them', url: 'https://hbr.org/2021/11/10-common-job-interview-questions-and-how-to-answer-them' },

        // Placeholder Resources
        { title: 'How to Prepare for a Behavioral Interview', url: 'https://example.com/behavioral-interview-prep' },
        { title: 'Dressing for Success: Interview Attire', url: 'https://example.com/interview-attire' },
        { title: 'Mastering the Virtual Interview', url: 'https://example.com/virtual-interview-tips' },
    ],
    'Job Search Strategies': [
        { title: '9 Job Search Strategies to Help you Find your Dream Job', url: 'https://www.indeed.com/career-advice/finding-a-job/job-search-strategy' },

        // Placeholder Resources
        { title: 'Leveraging LinkedIn for Job Searching', url: 'https://example.com/linkedin-job-search' },
        { title: 'The Power of Networking in Job Hunting', url: 'https://example.com/networking-strategies' },
        { title: 'How to Use Social Media in Your Job Search', url: 'https://example.com/social-media-job-search' },
    ],
    'Career Development': [
        { title: '12 tips for career development and advancement', url: 'https://www.intuit.com/blog/innovative-thinking/12-tips-for-career-development-and-advancement/' },

        // Placeholder Resources
        { title: 'Setting Career Goals and How to Achieve Them', url: 'https://example.com/setting-career-goals' },
        { title: 'The Importance of Continuous Learning in Your Career', url: 'https://example.com/continuous-learning' },
        { title: 'Mentorship: Finding a Mentor and Why It Matters', url: 'https://example.com/finding-a-mentor' },
    ]
};

export const Resources = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container spacing={3} style={{ margin: "-17px" }}>
            {/* Display either sidebar or mobile menu */}
            {isMobile ? (
                <MobileMenu />
            ) : (
                <Grid item xs={2} className='sidebar-container'>
                    <Sidebar />
                </Grid>
            )}

            <Grid item xs={10} id="dash" container spacing={2}>
                {Object.entries(resources).map(([category, links]) => (
                    <Grid item xs={12} sm={6} key={category}>
                        <Typography variant="h5" gutterBottom>
                            {category}
                        </Typography>
                        <ul>
                            {links.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Resources;

