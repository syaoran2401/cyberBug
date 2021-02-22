import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import imgDownload from '../../assets/img/download.jfif'

export default function MenuCyberBug() {
    const userInfo = useSelector(state => state.UserLoginReducer.userLogin);
    return (
        <div className="menu">
            <div className='mt-3 mr-3 d-flex justify-content-end' style={{whiteSpace:'nowrap'}}>
                <button>
                    <NavLink to="/login">Login</NavLink>
                </button>
                <button className='mx-3'>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </button>
              
            </div>
                <button className='mx-3'>
                    <NavLink to='/dragdrop'>Demo Drag Drop</NavLink>
                </button>
                <button className='mx-3'>
                    <NavLink to='/dragdropdnd'>Demo Drag Drop DND</NavLink>
                </button>

            <div className='d-flex justify-content-center align-items-center mt-3 '>
                <div className='mr-2'>
                    <img src={userInfo.avatar} alt="avatar" style={{width:'30px', height:'30px', border:'1px solid black', borderRadius:'50%'}} />
                </div>
                <div>{userInfo.name}</div>
            </div>

            <div className="account">
                <div className="avatar">
                    <img src={imgDownload} alt='download' />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div>
                    <i className="fa fa-credit-card" />
                    <NavLink to='/home' className='text-decoration-none ' activeClassName='active font-weight-bold text-pirmary '  >Cyber Board</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog" />
                    <NavLink to='/projectsettings' className='text-decoration-none ' activeClassName='active font-weight-bold text-pirmary'>Create Project</NavLink>
                </div>
                <div>
                    <i className="fa fa-cog" />
                    <NavLink to='/projectmanagement' className='text-decoration-none ' activeClassName='active font-weight-bold text-pirmary'>Project Management</NavLink>
                </div>
                <div>
                <i className="fa fa-cog" />
                <NavLink to='/usermanagement'className='text-decoration-none ' activeClassName='active font-weight-bold text-pirmary'>Users Management</NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    )
}
