// Source of truth: the four project reports (with the original resume as a
// fallback for anything a report doesn't cover). Architecture diagrams and
// screenshots below are the actual figures from those reports — nothing
// generated or stock. When a newer report/image is provided, update the
// imports and fields here; components should never hardcode project facts.

import p1Architecture from '../assets/projects/project-01/architecture.png'

import p2Architecture from '../assets/projects/project-02/architecture.png'
import p2Shot1 from '../assets/projects/project-02/screenshot-01-face-capture.png'
import p2Shot2 from '../assets/projects/project-02/screenshot-02-signin-username.png'
import p2Shot3 from '../assets/projects/project-02/screenshot-03-signin-password.png'
import p2Shot4 from '../assets/projects/project-02/screenshot-04-dashboard.png'

import p3Architecture from '../assets/projects/project-03/architecture.png'
import p3Shot1 from '../assets/projects/project-03/screenshot-01-login.png'
import p3Shot2 from '../assets/projects/project-03/screenshot-02-hr-dashboard.png'
import p3Shot3 from '../assets/projects/project-03/screenshot-03-employee-dashboard.png'
import p3Shot4 from '../assets/projects/project-03/screenshot-04-certificate.png'

import p4Architecture from '../assets/projects/project-04/architecture.png'
import p4Shot1 from '../assets/projects/project-04/screenshot-01-step-functions-workflow.png'

const projects = [
  {
    number: '01',
    slug: 'resume-screener',
    title: 'AI-Powered Resume Screener & Talent Acquisition Pipeline',
    description:
      'A recruiter portal that uploads resumes and job descriptions, extracts candidate skills and experience with Textract and Comprehend, scores each candidate, and sends interview invitations to the ones who are shortlisted.',
    services: [
      'Amazon Cognito',
      'Amazon S3',
      'API Gateway',
      'AWS Lambda',
      'Amazon Textract',
      'Amazon Comprehend',
      'DynamoDB',
      'Amazon SES',
    ],

    purpose:
      'Recruiters often receive hundreds of applications for a single role — reviewing every resume by hand is slow, inconsistent, and delays hiring.',
    whatBuilt:
      'A recruiter portal where HR signs in with Amazon Cognito, uploads a job description and multiple resumes, and the system extracts candidate details, scores each candidate against the job description, and sends interview invitations to shortlisted candidates.',
    workflow: [
      'HR signs in through Amazon Cognito.',
      'The recruiter uploads a job description and multiple resume PDFs.',
      'The Upload Lambda validates the files and stores them in S3.',
      'The JD Analyzer Lambda extracts and analyzes the job description using Textract and Comprehend.',
      'The Resume Parser Lambda extracts candidate details, skills, and experience from each resume.',
      'The Scoring Engine Lambda compares each candidate against the job description and calculates a match score.',
      'The dashboard lists ranked candidates by score, skills, and experience.',
      'The recruiter selects candidates, and the Send Email Lambda sends interview invitations via Amazon SES.',
    ],
    implementationDetails: [
      'Candidate match score is calculated as (Skills × 50%) + (Job Title × 30%) + (Experience × 20%).',
      'Six Lambda functions handle upload, JD analysis, resume parsing, scoring, candidate retrieval, and email sending.',
      'DynamoDB stores two tables — Jobs and Candidates — for structured job and candidate data.',
    ],

    architectureImage: p1Architecture,
    screenshots: [],
    githubAvailable: false,
    githubUrl: null,
  },
  {
    number: '02',
    slug: 'attendance-system',
    title: 'Serverless Attendance System with Face Recognition',
    description:
      'A contactless attendance system where employees check in with a face capture, Amazon Rekognition matches it against registered employees, and administrators track attendance on a live dashboard.',
    services: [
      'Amazon Cognito',
      'Amazon S3',
      'API Gateway',
      'AWS Lambda',
      'Amazon Rekognition',
      'DynamoDB',
      'EventBridge',
    ],

    purpose:
      'Traditional attendance methods — registers, fingerprint devices, ID-card punches — involve physical contact, dedicated hardware, and manual reconciliation.',
    whatBuilt:
      'A serverless attendance system where employees capture a face image through a web app; Amazon Rekognition compares it against registered reference images, and a successful match is logged to DynamoDB. Administrators sign in through Cognito to register employees and view attendance on a live, filterable dashboard, with daily records archived automatically.',
    workflow: [
      'An administrator signs in via Amazon Cognito and registers a new employee with a reference face image.',
      'Employee details are stored in DynamoDB and the reference image in the emp-images S3 bucket.',
      'An employee captures an attendance image through the web app, which uploads it to the attendance-images S3 bucket.',
      'The S3 upload event triggers the Image Recognition Lambda, which calls Amazon Rekognition to compare the image against the registered reference.',
      'On a match, the Attendance Employee Lambda records the check-in in the Emp-Attendance DynamoDB table; on no match, the request is rejected.',
      'Amazon EventBridge triggers a scheduled Lambda that archives each day\u2019s attendance records to S3 and removes the temporary captured images.',
      'Administrators view live totals and filterable records on the Attendance Dashboard.',
    ],
    implementationDetails: [
      'Seven single-purpose Lambda functions handle registration, dashboard data, image upload, face recognition, attendance recording, archival, and image cleanup.',
      'Attendance records use a composite DynamoDB key of employee_id (partition) and date (sort) for efficient per-employee, per-day lookups.',
      'Captured attendance images are stored only temporarily and removed after processing.',
    ],

    architectureImage: p2Architecture,
    screenshots: [
      { src: p2Shot1, caption: 'Employee face-capture screen — Capture, Retake, and Send controls.' },
      { src: p2Shot2, caption: 'Admin sign-in — username step (Amazon Cognito).' },
      { src: p2Shot3, caption: 'Admin sign-in — password step (Amazon Cognito).' },
      { src: p2Shot4, caption: 'Attendance Dashboard — totals, filters, and daily records.' },
    ],
    githubAvailable: false,
    githubUrl: null,
  },
  {
    number: '03',
    slug: 'learning-tracker',
    title: 'Employee Learning & Skill Certification Tracker',
    description:
      'A serverless learning portal for HR to manage courses and employee quizzes. Automated certificate generation and delivery using S3, CloudFront and SES.',
    services: [
      'API Gateway',
      'AWS Lambda',
      'DynamoDB',
      'Amazon S3',
      'CloudFront',
      'Amazon SES',
      'Amazon SNS',
      'EventBridge',
    ],

    purpose:
      'Organisations often lack visibility into employee learning — which courses were assigned, who completed them, who is overdue, and where skill gaps exist — because records are scattered across spreadsheets and disconnected portals.',
    whatBuilt:
      'A single React/Vite/Tailwind front end with role-based routing, where HR publishes courses and quizzes, employees complete them, and the system automatically grades quizzes, issues certificates, and lets HR track completion and skill gaps across the organisation.',
    workflow: [
      'HR creates a course and configures its quiz, with correct answers stored as SHA-256 hashes.',
      'HR assigns the course to a role or specific employees; Amazon SES emails the employee the course link and due date.',
      'The employee completes the course video and takes the quiz through the Quiz & Submit Lambda.',
      'The Calculate Results Lambda grades the submission and enforces a three-attempt limit.',
      'On a pass, the Generate Certificate Lambda creates a certificate PDF, stores it in S3, and delivers it via CloudFront, with SES notifying the employee.',
      'Certificates can be verified at any time through a dedicated verification endpoint.',
      'HR reviews completion and skill-gap data on a dashboard, while a scheduled EventBridge job sends a weekly SNS summary of overdue assignments.',
    ],
    implementationDetails: [
      'Quiz answers are stored as SHA-256 hashes and graded server-side, with a maximum of three attempts per quiz.',
      'Six DynamoDB tables (employees, courses, questions, assignments, completions, certificates) back the application.',
      'Certificates are served through CloudFront rather than a public S3 URL, and can be verified via GET /certificates/verify/{cert_id}.',
    ],

    architectureImage: p3Architecture,
    screenshots: [
      { src: p3Shot1, caption: 'Employee Learning Portal — role-based login screen.' },
      { src: p3Shot2, caption: 'HR Dashboard — course records, completions, and course management.' },
      { src: p3Shot3, caption: 'Employee Dashboard — assigned courses, quiz status, and due dates.' },
      { src: p3Shot4, caption: 'Sample generated certificate of completion.' },
    ],
    githubAvailable: false,
    githubUrl: null,
  },
  {
    number: '04',
    slug: 'leave-management',
    title: 'Smart Leave & Absence Management Engine',
    description:
      'A web portal for leave applications and balance tracking using DynamoDB and Cognito, with manager and HR approval workflows built on AWS Step Functions.',
    services: [
      'Amazon Cognito',
      'API Gateway',
      'AWS Lambda',
      'AWS Step Functions',
      'DynamoDB',
      'Amazon SES',
      'Slack API',
      'EventBridge',
      'CloudFront',
    ],

    purpose:
      'Traditional leave management leans on email, spreadsheets, and manual balance calculations — which delays approvals, risks inaccurate balances, and makes leave rules hard to change without touching application code.',
    whatBuilt:
      'A React web portal, hosted on S3 and CloudFront, where employees submit leave requests that are validated and routed through an AWS Step Functions approval workflow — automatic approval, manager approval, and an additional HR approval stage for requests over five days — with the leave balance deducted only after final approval.',
    workflow: [
      'The employee submits a leave request through the React portal; API Gateway invokes the Submit Leave Lambda.',
      'The request is validated for employee, leave type, dates, balance, and conflicting approved leave, then starts the Step Functions workflow.',
      'An Auto Approve Check decides whether the request can skip straight to approval.',
      'If manager approval is required, the manager is notified and the workflow waits for their decision.',
      'Requests longer than five days go through an additional HR/Admin approval stage after manager approval.',
      'On final approval, the leave balance is deducted, an audit entry is recorded, and SES/Slack notify the relevant users.',
      'A rejected request is marked accordingly with no balance deduction, and the employee is notified.',
      'Amazon EventBridge triggers a weekly scheduled job for carry-forward and balance-processing activities.',
    ],
    implementationDetails: [
      'The approval workflow is orchestrated with AWS Step Functions, with explicit states for validation, auto-approval, manager decision, duration check, and HR decision.',
      'Leave rules and quotas are stored as configurable DynamoDB data (LeaveRules) rather than hardcoded in the application.',
      'Notifications run through Amazon SES and the Slack API — the report notes that SNS was mentioned at the requirement level but is not part of the implemented architecture.',
    ],

    architectureImage: p4Architecture,
    screenshots: [
      { src: p4Shot1, caption: 'AWS Step Functions state machine for the leave approval workflow.' },
    ],
    githubAvailable: false,
    githubUrl: null,
  },
]

export default projects
