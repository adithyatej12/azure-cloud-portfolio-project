const fs = require('fs');

async function testToken() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.error('Error: GITHUB_TOKEN environment variable not set');
    return;
  }
  const query = `{
    user(login: "Govind-Madhav") {
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Next.js-GitHub-Stats-Fetcher'
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    console.log('API Status:', res.status);
    console.log('Result Keys:', Object.keys(data));
    if (data.data?.user) {
      console.log('SUCCESS! Total Contributions:', data.data.user.contributionsCollection.contributionCalendar.totalContributions);
      console.log('Total Weeks:', data.data.user.contributionsCollection.contributionCalendar.weeks.length);
    } else {
      console.log('Errors:', data.errors);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

testToken();
