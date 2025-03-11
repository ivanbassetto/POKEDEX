const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="partA_header">
        <img src="/diversos/Pokeball.png" alt="" />
        <h1>Pokédex</h1>
      </div>
      <div className="partB_header">
  <div className="input-container">
    <span className="material-symbols-rounded search-icon">search</span>
    
    <input type="text" placeholder="Search" />
  </div>
  <div className="circle">
    #
  </div>
</div>


    </header>
  );
};

export default Header;