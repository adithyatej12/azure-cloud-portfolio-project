// Source of truth: resume experience + project tech stacks. The AWS
// "toolbox" list below is the union of every AWS service explicitly named
// across the F13 internship bullets and the four project tech lists —
// nothing added that isn't already used elsewhere in this data set.

const awsToolbox = [
  'Lambda',
  'S3',
  'DynamoDB',
  'API Gateway',
  'Step Functions',
  'Cognito',
  'IAM',
  'EventBridge',
  'CloudFront',
  'Textract',
  'Comprehend',
  'Rekognition',
  'SES',
  'SNS',
]

const skillGroups = [
  {
    label: 'Cloud',
    items: [
      {
        name: 'Amazon Web Services (AWS)',
        detail: 'Cloud & serverless development — the core technology across this portfolio.',
        toolbox: awsToolbox,
      },
    ],
  },
  {
    label: 'Programming',
    items: [
      { name: 'Python', detail: 'General-purpose programming and scripting.' },
      { name: 'SQL', detail: 'Querying and working with data.' },
      { name: 'SAP ABAP', detail: 'Used for SAP production support at Deloitte.' },
    ],
  },
  {
    label: 'Tools & Version Control',
    items: [
      { name: 'ServiceNow', detail: 'Used for incident and service request management at Deloitte.' },
      { name: 'ITSM', detail: 'Used for incident and service request management at Deloitte.' },
      { name: 'Git', detail: 'Version control for project work.' },
      { name: 'GitHub', detail: 'Version control for project work.' },
    ],
  },
  {
    label: 'Operating Systems',
    items: [{ name: 'Linux', detail: 'Comfortable working in Linux environments.' }],
  },
]

export default skillGroups

