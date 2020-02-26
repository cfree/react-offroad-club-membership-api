module.exports = {
  // Deprecated in favor of roles
  // 'permissions': [
  //   'DASHBOARD_AREA', // All except locked/inactive/resigned/removed
  //   'ADMIN_AREA', // Board, admin
  //   'VOTE_READ', // Full member
  //   'USER_DELETE', // Admin
  //   'ROSTER_READ', // Full members, emeritus, board, admin
  //   'PERMISSION_UPDATE', // Admin
  // ],
  roles: [
    'ADMIN', // Manage permissions
    'OFFICER', // Administrative area
    'RUN_MASTER', // Able to create events
    'RUN_LEADER', // Able to view extra event details, log run report
    'USER', // DEFAULT
  ],
  accountStatus: [
    'ACTIVE',
    'PAST_DUE', // account overdue - active, must pay
    'DELINQUENT', // account 3 months to 1 year overdue - locked, contact, must pay
    'INACTIVE', // account 1+ year overdue - locked, contact
    'REMOVED', // cannot do anything - locked, contact
    'RESIGNED', // cannot do anything - locked, contact 
    'LIMITED', // attended too many runs - locked, must become member
    'LOCKED', // DEFAULT - must be approved
  ],
  accountType: [
    'FULL',
    'ASSOCIATE', // No voting rights, no member's only events/discussion
    'EMERITUS', // Same as Associate
    'GUEST', // DEFAULT - confirmed user. No roster, no voting rights, no member's only events/discussion
  ],
  offices: {
    PRESIDENT: 'President', // unique
    VICE_PRESIDENT: 'Vice President', // unique
    SECRETARY: 'Secretary', // unique
    TREASURER: 'Treasurer', // unique
  },
  titles: {
    'WEBMASTER': 'Webmaster', // unique
    'RUN_MASTER': 'Run Master', // unique
    'RUN_LEADER': 'Run Leader',
    'EMERITUS_MEMBER': 'Emeritus Member',
    'CHARTER_MEMBER': 'Charter Member',
  },
  emailGroups: [
    'officers',
    'runmaster',
    'webmaster',
    'run_leaders',
    'full_membership', // Membership announcement, membership newsletter
    'all_active', // Events, general announcements
    'guests',
    'all_users', // EVERYONE EVER
  ],
};

/**
 * Check Logged-in
 * Check Role
 * Check Account Status
 */
