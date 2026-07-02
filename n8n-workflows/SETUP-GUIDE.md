# n8n Setup Guide — Smart Defense Radar Backend

## Step 1: Create n8n Cloud Account
1. Go to https://app.n8n.cloud/register
2. Sign up (free, no credit card needed)
3. Note your instance URL: `https://your-name.app.n8n.cloud`

## Step 2: Add Credentials

### OpenRouter API Key
1. In n8n: Settings → Credentials → Add Credential
2. Search "Header Auth"
3. Name: `OpenRouter API`
4. Header Name: `Authorization`
5. Header Value: `Bearer sk-or-YOUR_KEY_HERE`
6. Save

### Google Sheets OAuth2
1. In n8n: Settings → Credentials → Add Credential
2. Search "Google Sheets OAuth2"
3. Follow OAuth flow to connect your Google account
4. Make sure the spreadsheet `2PACX-1vTM9KAs7vjq6efmyltasWErfYKZYRbCbRId-Fp7CLbD55_oXQzsVu07pAFcm1G1T9iz8HrFHpvA2wms` is accessible

## Step 3: Import Workflow
1. In n8n: Click "+" → Import from File
2. Select `tg-monitor-workflow.json` from this folder
3. The workflow will appear in your editor

## Step 4: Configure Credentials in Workflow
1. Click on "AI Analysis (OpenRouter)" node
2. Under Authentication, select your `OpenRouter API` credential
3. Click on "Write to Google Sheets" node
4. Under Credentials, select your `Google Sheets OAuth2` credential
5. Verify the spreadsheet URL matches

## Step 5: Test
1. Click "Execute Workflow" button
2. Check each node's output
3. Verify a new row appears in your Google Sheets

## Step 6: Activate
1. Toggle the workflow to "Active" (top-right switch)
2. It will now run every hour automatically

## Execution Budget
- 24 executions/day × 30 days = ~720/month
- Well within n8n Cloud free tier (2,000/month)
- Leaves ~1,280 executions for other workflows

## Troubleshooting
- **RSS feed empty**: rsshub.app may be blocked in Iran. Use a VPN or alternative RSS source.
- **Google Sheets error**: Re-authenticate OAuth2 credential
- **OpenRouter error**: Check API key balance at openrouter.ai
