import React, { useEffect } from 'react';

const GoogleButton = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        id='g_id_onload'
        data-client_id='992190689462-ts8jtjd9m7r9fd3ofl38d6ibnn9vf0s2.apps.googleusercontent.com'
        data-context='signin'
        data-ux_mode='popup'
        data-callback='handleCredentialResponse'
        data-auto_select='true'
        data-itp_support='true'
        data-use_fedcm_for_prompt='true'
      />
      <div
        className='g_id_signin'
        data-type='standard'
        data-shape='pill'
        data-theme='outline'
        data-text='signin'
        data-size='large'
        data-logo_alignment='left'
      />
    </>
  );
};

export default GoogleButton;