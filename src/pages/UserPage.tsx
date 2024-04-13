//Vartotojo informacija su forma kuria galima atnaujinti vartotojo varda ir paveiksleli

//Vartotojo skelbimai. Skelbimu sarasas kurie priklauso vartotojui. Kiekvienas skelbimas turi mygtuka istrinti ir skaityti daugiau.

export default function UserPage() {
  return (
    <div>
      <div className='container'>
        <h1 className='title'>UserPage</h1>
        <p className='text'>welcome to youruser page</p>

        <h3>Username: </h3>
        <input type='text' />
        <h3>Created At</h3>

        <button className='btn'>Edit Profile name</button>
        <button className='btn'>Edit avatar_url</button>
      </div>
    </div>
  );
}
