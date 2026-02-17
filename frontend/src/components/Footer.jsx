import React from 'react'

const Footer = ({ completedTasksCount = 0, activeTasksCount = 0}) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className='text-base text-white font-bold'>
            {completedTasksCount > 0 && (
              <>
                🍒 {completedTasksCount} Task Completed!
                {
                 activeTasksCount > 0 && `, 🥕 Just ${activeTasksCount} task left. Get some milk!`
                }
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                🥀 You have {activeTasksCount} task. Work harder!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};
export default Footer;