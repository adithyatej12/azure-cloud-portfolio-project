import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'utkarshsrivastava2534@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Utkarsh, I am reaching out to you because...',

    oldPortfolio: 'https://github.com/UTKARSH2534',
    upworkProfile: 'https://www.linkedin.com/in/utkarsh-srivastava-412492273/',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/UTKARSH2534' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/utkarsh-srivastava-412492273/' },
    { name: 'email', url: 'mailto:utkarshsrivastava2534@gmail.com' },
];

export const MY_STACK = {
    'cloud & devops': [
        {
            name: 'AWS',
            icon: '/logo/aws.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'GitHub',
            icon: '/logo/github.png',
        },
    ],
    backend: [
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
    ],
    frontend: [
        {
            name: 'React.js',
            icon: '/logo/react.png',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
    ],
    database: [
        {
            name: 'MySQL',
            icon: '/logo/mysql.svg',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgreSQL.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'FINGUARD – Real-Time Fraud Detection',
        slug: 'finguard-fraud-detection',
        liveUrl: 'https://github.com/UTKARSH2534',
        year: 2025,
        description: `
      Built a real-time fraud detection pipeline using Kafka, Databricks, and PySpark with a Bronze–Silver–Gold data processing architecture. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>⚡ Real-Time Data Pipeline: Ingested transactional streams via Kafka & Confluent Cloud</li>
        <li>🥇 Medallion Architecture: Processed data through Bronze–Silver–Gold delta tables in Databricks</li>
        <li>🚨 Fraud Alerting: Implemented real-time detection, high-value transaction alerts, and automated email notifications</li>
        <li>🗄️ Database Integration: Stored structured transactional data using PostgreSQL and optimized SQL queries</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Stream processing implementation using PySpark and Kafka</li>
        <li>Cloud data infrastructure setup on Databricks and Confluent Cloud</li>
        <li>Automated alert triggering for anomalous financial activity</li>
      </ul>
      `,
        role: `
      Cloud & Data Pipeline Engineer <br/>
      Owned the pipeline implementation:
      <ul>
        <li>✅ Ingestion: Configured real-time transaction streaming with Apache Kafka</li>
        <li>⚙️ Processing: Built PySpark scripts for fraud filtering & transformation</li>
        <li>📧 Alerts: Implemented real-time email notification workflows for suspicious activities</li>
        <li>💾 Storage: Designed schema and querying layer in PostgreSQL</li>
      </ul>
      `,
        techStack: [
            'Python',
            'Kafka',
            'Confluent Cloud',
            'Databricks',
            'PySpark',
            'PostgreSQL',
            'SQL',
        ],
        thumbnail: '/projects/thumbnail/epikcart.jpg',
        longThumbnail: '/projects/long/epikcart.jpg',
        images: [
            '/projects/images/epikcart-1.png',
            '/projects/images/epikcart-2.png',
        ],
    },
    {
        title: 'AI-Based Lung Cancer Detection',
        slug: 'lung-cancer-detection',
        liveUrl: 'https://github.com/UTKARSH2534/Lung-cancer-detection-using-AI',
        sourceCode: 'https://github.com/UTKARSH2534/Lung-cancer-detection-using-AI',
        year: 2024,
        description: `Developed an AI application for early lung cancer detection using sequential medical data and an LSTM neural network model. Performed comprehensive preprocessing, model training, and performance evaluations using metrics like Accuracy, Precision, Recall, and F1-Score.`,
        role: `As the Lead ML Developer, I:<br/>
        - Preprocessed sequential medical dataset and handled data normalization.<br/>
        - Built and trained an LSTM-based deep learning model optimized for early cancer detection.<br/>
        - Conducted model evaluation using Precision, Recall, Accuracy, and F1-Score metrics.`,
        techStack: [
            'Machine Learning',
            'Python',
            'LSTM',
            'NumPy',
            'Scikit-learn',
            'Matplotlib',
        ],
        thumbnail: '/projects/thumbnail/resume-roaster.jpg',
        longThumbnail: '/projects/long/resume-roaster.jpg',
        images: [
            '/projects/images/resume-roaster-1.png',
            '/projects/images/resume-roaster-2.png',
        ],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'DevOps Trainee',
        company: 'Ainwik Infotech – Noida',
        duration: 'Nov 2024 – Mar 2025',
    },
    {
        title: 'Industrial Training (Automation Workflows)',
        company: 'Nayara Energy – Jamnagar, Gujarat',
        duration: 'Apr 2025 – May 2025',
    },
    {
        title: 'MCA – Storage & Cloud Technology',
        company: 'JAIN University, Bengaluru',
        duration: '2025 – Expected 2027',
    },
    {
        title: 'BCA – Bachelor of Computer Applications',
        company: 'Parul University, Gujarat',
        duration: '2022 – 2025',
    },
];

