# Troubleshooting Common Errors

## Common Errors and Solutions

### 1. "Permission denied" Error

**Error Message:**
```
Error: PERMISSION_DENIED: Permission denied
```

**Solution:**
- Check Firebase Realtime Database rules
- Make sure you're signed in
- Verify rules allow authenticated users to read/write
- Rules must be published (not just saved)

### 2. "Index not defined" Error

**Error Message:**
```
Error: Index not defined, add ".indexOn": "verification_status" for path "/service_providers"
```

**Solution:**
- Go to Firebase Console → Realtime Database → Rules
- Add index definitions in the rules (optional for small datasets)
- OR: The code will automatically fall back to filtering in memory

### 3. "Cannot read property 'exists' of undefined"

**Error Message:**
```
TypeError: Cannot read property 'exists' of undefined
```

**Solution:**
- This happens when database query returns null
- Already handled in the updated code with try-catch blocks
- Make sure Firebase is properly initialized

### 4. Firebase App Not Initialized

**Error Message:**
```
Firebase: No Firebase App '[DEFAULT]' has been created
```

**Solution:**
- Check `lib/firebase.ts` - make sure config is correct
- Verify database URL is correct
- Make sure Firebase SDK is installed: `npm install firebase`

### 5. "Service categories not found"

**Error Message:**
```
No service categories found
```

**Solution:**
- Initialize the database with service categories
- Go to `/setup-database` or use the initialization script
- Or manually add categories in Firebase Console

### 6. Module Not Found Errors

**Error Message:**
```
Module not found: Can't resolve 'firebase/firestore'
```

**Solution:**
- ✅ Already fixed! The `lib/firestore-helpers.ts` now only exports from `realtime-helpers`
- If you still see this, restart the dev server: `npm run dev`

### 7. Query Errors in Realtime Database

**Error Message:**
```
Error: Query.orderByChild failed: First argument was an invalid path
```

**Solution:**
- Make sure the field you're querying exists in your data
- For empty databases, the code handles this gracefully
- Check that your data structure matches the expected format

## Quick Fixes

### Clear Cache and Restart
```bash
# Stop the dev server (Ctrl+C)
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Restart
npm run dev
```

### Check Firebase Configuration
1. Open `lib/firebase.ts`
2. Verify all config values are correct
3. Make sure database URL matches your Firebase project

### Verify Database Rules
1. Go to Firebase Console
2. Realtime Database → Rules
3. Make sure rules are published (green "Publish" button)
4. Test rules with the rules simulator

### Check Authentication
1. Make sure you're signed in to the app
2. Check Firebase Console → Authentication → Users
3. Verify your user exists

## Debugging Steps

1. **Check Browser Console**
   - Open DevTools (F12)
   - Look for error messages
   - Check Network tab for failed requests

2. **Check Firebase Console**
   - Go to Realtime Database → Data
   - Verify data structure
   - Check for any error indicators

3. **Verify Code**
   - Run `npm run typecheck` to check for TypeScript errors
   - Run `npm run lint` to check for linting errors

4. **Test Firebase Connection**
   - Add this to a component temporarily:
   ```typescript
   import { ref, get } from 'firebase/database';
   import { db } from '@/lib/firebase';
   
   useEffect(() => {
     const test = async () => {
       try {
         const testRef = ref(db, 'test');
         await set(testRef, { test: 'data' });
         console.log('Firebase connected!');
       } catch (error) {
         console.error('Firebase error:', error);
       }
     };
     test();
   }, []);
   ```

## Still Having Issues?

1. **Share the exact error message** from the console
2. **Check the browser console** for more details
3. **Verify Firebase project** is active and billing is enabled (if needed)
4. **Check network connectivity** to Firebase servers

## Common Solutions Summary

| Error | Quick Fix |
|-------|-----------|
| Permission denied | Check database rules, sign in |
| Index not defined | Add index or ignore (code handles it) |
| Module not found | Restart dev server, clear cache |
| Categories not found | Initialize database |
| Firebase not initialized | Check config in `lib/firebase.ts` |

---

**If you're still seeing errors, please share:**
1. The exact error message from console
2. Where it occurs (which screen/action)
3. Browser console logs

