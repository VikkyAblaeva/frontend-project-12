import { Navigate } from 'react-router-dom';

const Root = () => {
  const handleInput = (e) => {
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const data = localStorage.getItem('token');
  if (!data) {
    return <Navigate to={"/login"} />;
  }
    return (
      <>
      <div className="header d-flex justify-content-around">
        <h1>Welcome to Chat!</h1>
        <button type="button" className='btn btn-primary w-7'>Выйти</button>
      </div>
        <div className="container-chat">
          <div className="left">
            <div className="channels">
              <span className='channelsText'>Каналы</span>
              <button className='buttAdd'>+</button>
            </div>
            <ul className='nav flex-column nav-pills nav-fill px-2'>
              <li className='nav-item w-100'>
                  <button type='button' className='w-100 mb-2 text-start btn btn-secondary'>
                    <span>
                      # 
                    </span>
                     general
                  </button>
                </li>
                <li className='nav-item w-100'>
                  <button type='button' className='w-100 mb-2 text-start btn btn-secondary'>
                    <span>
                      # 
                    </span>
                     random
                  </button>
                </li>
              </ul>
          </div>
          <div className="right d-flex flex-column h-100">
            <div className='bg-light mb-4 p-3 shadow-sm small'>
              <p className='m-0'>
                <b># random</b>
              </p>
              <span className='text-muted'>0 сообщений</span>
            </div>
            <div id='messages-box' className='chat-messages overflow-auto px-5 '>
            </div>
            <div className='mt-auto px-5 py-3'>
              <form noValidate className='py-1 border rounded-2'>
                <div className='input-group has-validation'>
                  <input name='body'
                  onChange={(e) => handleInput(e)}
                  arial-label="Новое сообщение"
                  placeholder='Введите сообщение...'
                  className='border-0 p-0 ps-2 form-control'></input>
                  <button type="submit"
                  onSubmit={(e) => handleSubmit(e)}
                  className='btn btn-primary'>
                  &gt;&gt;&gt;
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  };

export default Root;
