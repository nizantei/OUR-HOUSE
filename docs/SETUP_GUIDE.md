# Our House - Complete Setup Guide

## Step 1: Run Database Schema in Supabase

1. Open your Supabase project: https://supabase.com/dashboard/project/qqvalflevmsnocarexkx

2. Click on **SQL Editor** in the left sidebar

3. Click **New query** button

4. Open the file `supabase_schema.sql` from this folder

5. Copy **ALL** the SQL content and paste it into the Supabase SQL Editor

6. Click **Run** button (or press Ctrl+Enter / Cmd+Enter)

7. Wait for it to complete. You should see success messages in the Results panel

8. Verify tables were created:
   - Click **Table Editor** in left sidebar
   - You should see tables like `users`, `houses`, `living_rooms`, `kitchens`, etc.

---

## Step 2: Create Storage Buckets

1. In your Supabase dashboard, click **Storage** in the left sidebar

2. Click **New bucket** and create the following buckets:

### Bucket 1: `furniture`
- Name: `furniture`
- Public: ✓ Yes (check the box)
- Click **Create bucket**

### Bucket 2: `room-backgrounds`
- Name: `room-backgrounds`
- Public: ✓ Yes
- Click **Create bucket**

### Bucket 3: `magnets`
- Name: `magnets`
- Public: ✓ Yes
- Click **Create bucket**

### Bucket 4: `plants`
- Name: `plants`
- Public: ✓ Yes
- Click **Create bucket**

### Bucket 5: `ui-elements`
- Name: `ui-elements`
- Public: ✓ Yes
- Click **Create bucket**

### Bucket 6: `user-uploads`
- Name: `user-uploads`
- Public: ✓ Yes (users will upload photos here)
- Click **Create bucket**

---

## Step 3: Set Up Google OAuth

### Part A: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)

2. Click the project dropdown at the top (next to "Google Cloud")

3. Click **New Project**

4. Enter project name: `Our House`

5. Click **Create**

6. Wait a few seconds, then select your new project from the dropdown

### Part B: Enable Google+ API

1. In the search bar at top, search for: **Google+ API**

2. Click on **Google+ API** in the results

3. Click **Enable** button

4. Wait for it to enable

### Part C: Configure OAuth Consent Screen

1. In the left sidebar, click **OAuth consent screen**

2. Choose **External** (unless you have a Google Workspace account)

3. Click **Create**

4. Fill in the form:
   - **App name**: Our House
   - **User support email**: nizantei@gmail.com (select from dropdown)
   - **App logo**: (skip for now, optional)
   - **Application home page**: Leave blank for now
   - **Authorized domains**: (skip for now)
   - **Developer contact email**: nizantei@gmail.com

5. Click **Save and Continue**

6. **Scopes page**: Click **Add or Remove Scopes**
   - Search for: `email`
   - Check: `../auth/userinfo.email`
   - Search for: `profile`
   - Check: `../auth/userinfo.profile`
   - Click **Update**
   - Click **Save and Continue**

7. **Test users page**: Click **Add Users**
   - Add your email: `nizantei@gmail.com`
   - Add your partner's email (if you know it)
   - Click **Add**
   - Click **Save and Continue**

8. Click **Back to Dashboard**

### Part D: Create OAuth Credentials

1. In the left sidebar, click **Credentials**

2. Click **Create Credentials** at the top

3. Select **OAuth client ID**

4. Choose **Application type**: Web application

5. **Name**: Our House Web Client

6. **Authorized JavaScript origins**: Leave blank

7. **Authorized redirect URIs**: Click **Add URI**
   - Enter: `https://qqvalflevmsnocarexkx.supabase.co/auth/v1/callback`
   - Click **Add URI** again
   - Enter: `http://localhost:5173/auth/callback` (for local development)

8. Click **Create**

9. A popup will appear with your credentials:
   - **Copy the Client ID** (looks like: `123456789-abc...apps.googleusercontent.com`)
   - **Copy the Client Secret** (looks like: `GOCSPX-abc123...`)
   - Keep this popup open or save these somewhere safe

### Part E: Configure Google OAuth in Supabase

1. Go back to your Supabase dashboard: https://supabase.com/dashboard/project/qqvalflevmsnocarexkx

2. Click **Authentication** in the left sidebar

3. Click **Providers** tab

4. Find **Google** in the list and click on it

5. Toggle **Enable Sign in with Google** to ON

6. Paste your **Client ID** from Google Cloud Console

7. Paste your **Client Secret** from Google Cloud Console

8. Click **Save**

---

## Step 4: Set Admin Account

Your email (`nizantei@gmail.com`) will automatically be set as admin when you first log in.

The database schema includes a seed command that sets your email as admin, but it only works AFTER you create your account.

To verify you're an admin:
1. After you log in to the app for the first time
2. Go to Supabase dashboard > **Table Editor**
3. Click on `users` table
4. Find your row and check that `is_admin` is `true`

If it's `false`, manually update it:
1. Click on the `is_admin` cell for your row
2. Change it to `true`
3. Click outside the cell to save

---

## Step 5: Verify Everything is Set Up

### Checklist:

- [ ] Supabase project created
- [ ] Database schema SQL ran successfully
- [ ] All tables visible in Table Editor
- [ ] 6 storage buckets created (furniture, room-backgrounds, magnets, plants, ui-elements, user-uploads)
- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created (Client ID & Secret)
- [ ] Google OAuth enabled in Supabase with credentials
- [ ] Authorized redirect URI added: `https://qqvalflevmsnocarexkx.supabase.co/auth/v1/callback`

---

## Next Steps

Once all the above is complete, the React application will be initialized and you can start development!

---

## Troubleshooting

### "Invalid redirect URI" error when logging in
- Make sure you added the exact redirect URI in Google Cloud Console:
  - `https://qqvalflevmsnocarexkx.supabase.co/auth/v1/callback`
- No trailing slash
- HTTPS (not HTTP)

### "Access blocked: This app's request is invalid"
- Make sure Google+ API is enabled
- Make sure OAuth consent screen is configured
- Add yourself as a test user

### "User not found" or "Not authenticated"
- Check that the user was created in Supabase `users` table after login
- Check that `auth.users` table in Supabase has your Google account

### Tables not created
- Check for SQL errors in the Results panel
- Make sure you copied the ENTIRE SQL file content
- Try running it in sections if it's too large

### Storage buckets not accessible
- Make sure buckets are set to **Public**
- Check bucket policies in Storage > [bucket name] > Policies

---

## Important URLs

- **Supabase Dashboard**: https://supabase.com/dashboard/project/qqvalflevmsnocarexkx
- **Google Cloud Console**: https://console.cloud.google.com
- **Project URL**: https://qqvalflevmsnocarexkx.supabase.co
- **Anon Key**: (stored in `.env.local` after React app setup)

---

You're ready to proceed! Let me know when you've completed these steps and I'll initialize the React application.
