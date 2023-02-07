import { Navigate } from 'react-router-dom';

const Root = () => {
  const data = localStorage.getItem('token');
  if (!data) {
    return <Navigate to={"/login"} />;
  }
    return (
      <>
        <div class="container-chat">
          <div class="left"></div>
          <div class="rigth"></div>
        </div>
      </>
    );
  };

export default Root;
