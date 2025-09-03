# 🔐 Admin Panel Setup

The Google Calendar and SMS management functionality has been moved to a password-protected admin panel for security.

## 🎯 **Access the Admin Panel**

### **URL**: `http://localhost:3000/admin`

### **Default Credentials**:
- **Password**: `admin123`

## 🔧 **Customizing the Admin Password**

### **Method 1: Environment Variables**
Add to your `.env` file:
```env
ADMIN_PASSWORD=your_secure_password_here
VITE_ADMIN_PASSWORD=your_secure_password_here
```

### **Method 2: Production Security**
For production deployments:
1. Set `ADMIN_PASSWORD` on your server
2. Set `VITE_ADMIN_PASSWORD` in your build environment
3. Use a strong, unique password

## 🛡️ **Security Features**

- ✅ **Server-side password verification** with client-side fallback
- ✅ **Session-based authentication** (clears on browser close)
- ✅ **Subtle navigation** (admin link is less prominent)
- ✅ **Secure logout** functionality
- ✅ **Clean separation** from public landing page

## 📋 **Admin Panel Features**

The admin panel includes all Google Calendar and SMS management features:

- **Google Calendar Authorization**
- **SMS Configuration Status**
- **Calendar Event Testing**
- **SMS Testing (both direct and calendar-based)**
- **Webhook Setup and Management**
- **HTTPS/ngrok Instructions**

## 🚀 **Usage**

1. **Navigate** to `/admin` from the main site
2. **Enter password** (default: `admin123`)
3. **Manage** Google Calendar and SMS settings
4. **Test** SMS functionality
5. **Logout** when finished

## 🔗 **Navigation**

- **From Landing Page**: Click "Admin" in the header (subtle gray link)
- **From Admin Panel**: Click "← Back to Site" to return to landing page
- **Direct URL**: `http://localhost:3000/admin`

## ⚠️ **Important Notes**

- Admin session persists until browser tab is closed or manual logout
- Password is verified server-side for enhanced security
- All calendar and SMS functionality is now admin-only
- Landing page remains clean and focused on marketing content

## 🔐 **Production Recommendations**

1. **Change the default password** immediately
2. **Use environment variables** for password management
3. **Consider additional security layers** (IP restrictions, etc.)
4. **Regular password rotation** for enhanced security
5. **Monitor admin access logs** if needed





