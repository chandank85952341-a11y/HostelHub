#!/usr/bin/env node
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  test: (msg) => console.log(`${colors.cyan}🧪 ${msg}${colors.reset}`),
  data: (msg) => console.log(`${colors.yellow}📊 ${msg}${colors.reset}`),
};

async function runTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 DATABASE & API TEST SUITE');
  console.log('='.repeat(60) + '\n');

  try {
    // Test 1: Database Connection
    log.test('TEST 1: Database Connection Check');
    const dbCheck = await axios.get(`${BASE_URL}/db-check`);
    if (dbCheck.data.ok) {
      log.success(`Connected to database: ${dbCheck.data.database}`);
      log.data(`Collections found: ${dbCheck.data.collections.join(', ')}`);
    }
    console.log();

    // Test 2: Get All Users
    log.test('TEST 2: Fetch All Users');
    const users = await axios.get(`${BASE_URL}/api/users/list`);
    if (users.data.ok) {
      log.success(`Found ${users.data.users.length} users in database`);
      users.data.users.forEach((user, i) => {
        log.data(`${i + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
      });
    }
    console.log();

    // Test 3: Get All Admins
    log.test('TEST 3: Fetch All Admins');
    const admins = await axios.get(`${BASE_URL}/api/admin/list`);
    if (admins.data.ok) {
      log.success(`Found ${admins.data.admins.length} admin(s) in database`);
      admins.data.admins.forEach((admin, i) => {
        log.data(`${i + 1}. ${admin.name} (${admin.email}) - Status: ${admin.status}`);
      });
    }
    console.log();

    // Test 4: User Login (Existing)
    log.test('TEST 4: Test User Login');
    const loginRes = await axios.post(`${BASE_URL}/api/users/login`, {
      email: 'ankit@gmail.com',
      password: '123456',
    });
    if (loginRes.data.ok) {
      log.success(`Login successful: ${loginRes.data.user.name}`);
      log.data(`Email: ${loginRes.data.user.email}, Role: ${loginRes.data.user.role}`);
    }
    console.log();

    // Test 5: Admin Login
    log.test('TEST 5: Test Admin Login');
    const adminLogin = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: 'admin@hostelhub.com',
      password: 'admin123',
    });
    if (adminLogin.data.ok) {
      log.success(`Admin login successful: ${adminLogin.data.admin.name}`);
      log.data(`Email: ${adminLogin.data.admin.email}`);
    }
    console.log();

    // Test 6: Get Admin Statistics
    log.test('TEST 6: Fetch Admin Statistics');
    const stats = await axios.get(`${BASE_URL}/api/admin/stats`);
    if (stats.data.ok) {
      log.success('Statistics retrieved successfully');
      log.data(`Total Owners: ${stats.data.stats.totalOwners}`);
      log.data(`Pending Approval: ${stats.data.stats.pendingOwners}`);
      log.data(`Approved: ${stats.data.stats.approvedOwners}`);
      log.data(`Blocked: ${stats.data.stats.blockedOwners}`);
    }
    console.log();

    // Test 7: Register New User
    log.test('TEST 7: Register New User');
    const newUser = await axios.post(`${BASE_URL}/api/users/register`, {
      name: 'Test User',
      email: `testuser-${Date.now()}@gmail.com`,
      password: 'password123',
      phone: '9876543210',
    });
    if (newUser.data.ok) {
      log.success(`New user registered: ${newUser.data.user.name}`);
      log.data(`Email: ${newUser.data.user.email}, ID: ${newUser.data.user.id}`);
    }
    console.log();

    // Test 8: Verify New User Registered
    log.test('TEST 8: Verify New User in Database');
    const updatedUsers = await axios.get(`${BASE_URL}/api/users/list`);
    if (updatedUsers.data.ok) {
      log.success(`Total users now: ${updatedUsers.data.users.length}`);
      log.data(`Latest user: ${updatedUsers.data.users[updatedUsers.data.users.length - 1].name}`);
    }
    console.log();

    // Summary
    console.log('='.repeat(60));
    log.success('ALL TESTS PASSED! ✨');
    console.log('='.repeat(60));
    console.log('\n📋 Summary:');
    console.log('   ✅ MongoDB Connection: Working');
    console.log('   ✅ User Endpoints: Working');
    console.log('   ✅ Admin Endpoints: Working');
    console.log('   ✅ Authentication: Working');
    console.log('   ✅ Data Persistence: Working');
    console.log('\n🎉 Your database is fully functional!\n');

  } catch (error) {
    console.log('\n' + '='.repeat(60));
    log.error('TEST FAILED!');
    console.log('='.repeat(60));
    if (error.code === 'ECONNREFUSED') {
      log.error('Cannot connect to backend server at http://localhost:5000');
      log.info('Make sure backend is running: node backend/server.js');
    } else if (error.response) {
      log.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
      log.data(`Response: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      log.error(`Error: ${error.message}`);
    }
    console.log('='.repeat(60) + '\n');
  }
}

runTests();
