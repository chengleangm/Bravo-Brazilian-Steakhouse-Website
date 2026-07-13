# BRAVO Brazilian Steakhouse Website

BRAVO's customer website and content-management dashboard, built with Next.js, React, TypeScript, and Tailwind CSS.

## Run the website locally

Requirements: Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the website at [http://localhost:3000](http://localhost:3000). To check a production build, run:

```bash
npm run build
npm start
```

## Client Guide: How to Update the Website

This section is for the restaurant owner or staff member who manages the website. You do not need any coding knowledge.

### Sign in

1. Open the website's admin link provided by the developer: `https://your-website.com/admin`.
2. Enter the admin password provided by the developer.
3. Click **Sign In**.
4. You will see the main **Dashboard**, where you can choose what to update.

Do not share the admin password with customers or post it online. Click **Log out** when using someone else's computer.

### The most important rule

After making a change, always click **Save**, **Save All**, or **Save Changes**. Wait until you see a success message. Then click **View Live Page** to check the customer website.

### How to update the home page

**Change the large heading and buttons**

1. From the Dashboard, click **Hero Text**.
2. Edit the tagline, subtitle, statistics, or button text.
3. Do not change a button link unless you know where it should go.
4. Click **Save**.
5. Click **View Live Page** and check the result.

**Change home page information**

1. Click **Home Sections**.
2. Update the welcome text, experience text, offers, reviews, or reservation information.
3. To create another offer, click **Add Offer** and complete its information.
4. Click **Save All**.

**Change home page pictures**

1. Click **Photos** or **Featured Dishes**.
2. Select the photo you want to replace.
3. Click **Upload** and choose a picture from your computer or phone.
4. Wait for the upload to finish.
5. Click **Save** and check the live home page.

### How to update the menu

1. From the Dashboard, click **Menu**.
2. Choose the correct menu section, such as **A La Carte** or **Grill Cuts**.
3. To add food, click **Add Item**.
4. Enter the food name, short description, price, and picture.
5. To change existing food, click its **Edit** button.
6. To remove food, click **Delete** and confirm only if you are sure.
7. Click **Save** or **Save Changes**.
8. Open **View Live Page** and confirm the name, price, and picture are correct.

Keep prices in the same format as the other menu items. Team or chef information managed on this page may also appear on the About page.

### How to add or update a promotion

1. Click **Promotions**.
2. Click **Add** to create a new promotion, or **Edit** on an existing promotion.
3. Add the title, description, date, time, button text, booking link, and picture.
4. Turn on **Active/Live** when the promotion is ready for customers.
5. Click **Save Changes**.
6. Use the up and down arrows to change the order of promotions.
7. When a promotion finishes, set it to **Hidden**. Delete it only if it will never be needed again.
8. Check the live Promotions page.

### How to update catering packages

1. Click **Catering**.
2. Update the package name, price, minimum number of guests, description, and included services.
3. Replace the hero picture if needed.
4. Click **Save**.
5. Check the live Catering page and make sure all prices are correct.

### How to update gallery photos

1. Click **Gallery Photos**.
2. Click **Add Photo** for one picture or **Bulk Upload** for several pictures.
3. Choose the correct category for each picture.
4. Add a short description where available.
5. Click the star to mark only the best pictures as **Featured**.
6. Use **Edit** to correct a photo or **Delete** to remove it.
7. Check the live Gallery page after saving.

To update the portrait videos shown in the gallery, open **Short Videos**, upload or replace the videos, save, and test that they play on the live page.

### How to change pictures on other pages

1. Click **Photos**.
2. Choose the page tab: Home, Menu, About, Gallery, Contact, or another available page.
3. Find the picture you want to replace.
4. Upload a new picture and wait until its preview appears.
5. Click **Save**.
6. Open that public page and check the picture on both phone and computer.

### Pictures that work best

- Use bright, clear, high-quality restaurant photos.
- Use horizontal photos for page banners and vertical photos for short-video covers.
- JPG or WebP is best for normal photos. PNG is best for a transparent logo.
- Avoid screenshots, blurry photos, and pictures containing another company's logo.
- Large files can upload slowly. If an upload fails, try a smaller version of the picture.

### Before you finish

Check these items every time you update the website:

- Did you click **Save** and see the success message?
- Are food names and prices correct?
- Are only current promotions marked **Live**?
- Do the new pictures display correctly?
- Do booking buttons open the correct contact or reservation page?
- Does the updated page look good on a phone?
- Did you log out if you used a shared computer?

### If something goes wrong

| Problem | What the client should do |
| --- | --- |
| Cannot sign in | Check the password carefully. If it still fails, contact the developer. |
| The page returns to the login screen | The login expired. Sign in again. |
| A change does not appear | Make sure you clicked Save, then refresh the live page. |
| A picture does not upload | Try a smaller JPG/WebP image. If it still fails, contact the developer. |
| The wrong promotion is visible | Open Promotions, change it to Hidden, and save again. |
| A price or text looks wrong | Return to its dashboard section, correct it, save, and refresh the live page. |

### Contact the developer when

- You cannot sign in after checking the password.
- Saving or uploading repeatedly fails.
- You want a new page, a new dashboard feature, or a layout change.
- The website displays an error message.
- You think the admin password has been shared with someone unauthorized.

---

## Technical Admin Notes for the Developer

Never put the admin password in source code or commit it to Git. Change it immediately if it is exposed.

### Recommended editing workflow

1. Open **Dashboard** and choose the section to manage.
2. Make one small group of changes at a time.
3. Check image previews, spelling, prices, dates, links, and active/visible status.
4. Click the page's **Save**, **Save All**, or **Save Changes** button. Typing in a field does not always save automatically.
5. Wait for the success message before leaving the page.
6. Click **View live page**, or open the public page in a new tab, and refresh once to confirm the result on desktop and mobile.

### Dashboard sections

| Admin section | What it manages | Public page |
| --- | --- | --- |
| Dashboard | Content totals and shortcuts to all management areas | `/` |
| Hero text | Home tagline, subtitle, statistics, and buttons | `/` |
| Home sections | Welcome, experience, offers, reviews, and reservation content | `/` |
| Photos | Hero and background images for Home, Menu, About, Gallery, Contact, and other pages | Several pages |
| Featured dishes | Homepage dishes and six-image photo strip | `/` |
| Promo video | Homepage video, title, and subtitle | `/` |
| Menu | A la carte items, grill cuts, prices, images, and team-member data | `/menu` and `/about` |
| Promotions | Promotion cards, dates, order, active status, hero image, and featured package | `/promotions` |
| Catering | Catering packages, price, minimum guests, benefits, and hero image | `/catering` |
| Gallery photos | Gallery images, categories, featured state, hero image, and story cards | `/gallery` |
| Short videos | Portrait videos displayed in the gallery | `/gallery` |

### Managing common content

**Text and links**

- Keep headings short so they fit on mobile screens.
- Internal links should start with `/`, for example `/menu` or `/contact#reservation`.
- External links must include `https://`.
- After changing several homepage fields, use **Save All** before leaving.

**Menu and prices**

- Choose the correct section before adding an item.
- Complete the item name, description, displayed price, and image.
- Keep price formatting consistent with existing items.
- Verify menu changes on `/menu`; team information saved here also appears on `/about`.

**Promotions**

- Use **Active/Live** only when an offer should be visible to customers.
- Set the date, time, CTA label, CTA link, and image before publishing.
- Use the up/down controls to arrange cards in the desired display order.
- Hide an expired promotion first; delete it only when it is no longer needed.

**Images**

- Upload a file from the computer or paste a direct public image URL.
- Use clear, compressed JPG/WebP files for photos and PNG only when transparency is needed.
- Avoid very large files; optimized images load faster for customers.
- Follow the recommended size/aspect-ratio hint shown beside each dashboard field.
- Add meaningful alternative text where available.

**Gallery and videos**

- Assign every gallery photo to the correct category.
- Use **Featured** sparingly for the strongest images.
- Bulk upload is useful for several gallery photos; review every item afterward.
- Confirm portrait videos play correctly on `/gallery` after saving.

### Daily and weekly checklist

Before service or after publishing an update:

- Confirm the current menu names and prices.
- Check that only valid promotions are active.
- Test booking/contact CTA links.
- Check the homepage, menu, promotions, catering, and gallery on a phone.
- Remove or hide expired offers.
- Keep an offline copy of important text, prices, and original media.

### Troubleshooting

| Problem | What to do |
| --- | --- |
| Login says the password is incorrect | Confirm `ADMIN_PASSWORD` is set in the current environment, then restart/redeploy the app. |
| Returned to the login screen | The seven-day session may have expired. Sign in again and ensure browser cookies are enabled. |
| Save or upload fails in production | Confirm all R2 environment variables below are configured in the hosting environment. |
| Change is not visible | Wait for the save confirmation, open the correct public page, and refresh it once. |
| Image does not display | Use a direct HTTPS image URL, or upload the file again and save. |
| Wrong promotion is visible | Check its Active/Live setting and save the promotion list again. |

## Environment variables

Create `.env.local` for local development. Do not commit this file.

```env
ADMIN_PASSWORD=replace-with-a-long-unique-password

# Required for persistent production content and media uploads
R2_BUCKET_NAME=
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
```

In development, dashboard content falls back to JSON files in `data/` when R2 is not configured. In production, R2 is required: content JSON is stored under `config/` in the bucket, and uploaded media is stored in R2.

Add the same variables to the production hosting provider and redeploy after changing them. Treat the R2 secret key and admin password as secrets.

## Main routes

- `/` — Home
- `/menu` — Menu
- `/about` — About
- `/promotions` — Promotions and events
- `/catering` — Catering
- `/gallery` — Gallery
- `/contact` — Contact and reservations
- `/admin` — Admin sign-in
- `/admin/dashboard` — Admin dashboard

## Project structure

```text
app/
  admin/       Admin dashboard pages
  api/admin/   Admin authentication, content, and upload APIs
  components/  Shared customer-facing components
  styles/      Global styles
  */page.tsx   Public pages
data/          Local-development content JSON
public/        Static media
middleware.ts  Admin route and API protection
```

## Deployment notes

- Configure `ADMIN_PASSWORD` and all R2 variables before using the production dashboard.
- Run `npm run build` before deployment to catch compile errors.
- After deployment, test admin login, one harmless save, an upload, and the corresponding live page.
- The reservation form sends booking details to the configured Telegram workflow; confirm that integration after deployment.
