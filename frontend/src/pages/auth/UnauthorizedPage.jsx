import React from 'react';

const UnauthorizedPage = () => (
  <div className="text-center p-10 text-red-600 font-semibold text-xl">
    ❌ Unauthorized – You do not have permission to access this page.
    <p className="mt-4">
      <a href="/login" className="text-blue-600 underline">Login as a different user</a>
    </p>
  </div>
);

export default UnauthorizedPage;
