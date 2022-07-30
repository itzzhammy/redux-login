import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import { selectUser } from '../features/userSlice';


const ProtectedRoute = ({component: Component, ...rest}) => {
    const user = useSelector(selectUser);

  return (
    <Route
    {...rest}
    render={ props =>{
        if (user){
            return <Component {...props} />
        }
        else{
            return (
            <Navigate 
                to={{
                pathName: "/",
                state:{
                    from: props.location
                }

            }
            }
            />)

        }
           
        }
    }
    />
  )
}

export default ProtectedRoute
