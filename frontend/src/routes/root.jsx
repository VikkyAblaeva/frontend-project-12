import { Navigate } from 'react-router-dom';

const Root = () => {
  const data = localStorage.getItem('token');
  if (!data) {
    return <Navigate to={"/login"} />;
  }
    return (
      <>
        <div>
          <h1>Chat Here</h1>
        </div>
      </>
    );
  };

export default Root;
