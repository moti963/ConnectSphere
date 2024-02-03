<header
className="navbar navbar-expand-lg bg-body-tertiary bg-dark p-2 d-flex"
data-bs-theme="dark"
>
<form className="d-flex">
  <input className="form-control" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
  <button className="btn btn-sm btn-outline-success" type="button" onClick={handleSearch}>Search</button>
</form>
<div className="nav-underline d-flex scrollmenu">
    <span
      className={`mx-2 btn nav-item nav-link link-primary ${selectedTag === null ? 'active' : ''}`}
      onClick={() => handleTagClick({ tag: null })}
    >
      Blogs
    </span>
    {allTags &&
      allTags.map((tag, index) => (
        <span
          key={index}
          className={`mx-2 btn nav-item nav-link link-primary ${selectedTag === tag.tag ? 'active' : ''}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag.tag}
        </span>
      ))}
  </div>
</header>

<div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
<button
    className="btn btn-secondary dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-bs-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
    onClick={toggleDropdown}
>
    Profile Menu
</button>
<ul
    className="dropdown-menu"
    aria-labelledby="dropdownMenuButton"
>
    {navItems.map((item) => (
        <li key={item.id}>
            <span
                className={`dropdown-item ${selectedNavItem === item.id ? 'active' : ''}`}
                onClick={() => handleNavItemClick(item.id)}
            >
                {item.label}
            </span>
        </li>
    ))}
</ul>
</div>
<div className="col-md-12 p-4">
<div className="profile-content">
    {renderProfileContent()}
</div>
</div>


// import React from 'react';

// const AlertMessage = ({ type, message }) => {

//     let alertClass = '';


//     switch (type) {
//         case 'primary':
//             alertClass = 'alert-primary';
//             break;
//         case 'secondary':
//             alertClass = 'alert-secondary';
//             break;
//         case 'success':
//             alertClass = 'alert-success';
//             break;
//         case 'warning':
//             alertClass = 'alert-warning';
//             break;
//         case 'error':
//             alertClass = 'alert-danger';
//             break;
//         default:
//             alertClass = 'alert-info';
//     }

//     return (
//         <div className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
//             {message}
//             <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//         </div>
//     );
// };

// export default AlertMessage;
