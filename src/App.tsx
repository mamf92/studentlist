import StudentSearchPage from './pages/StudentSearchPage'
import SonansLogo from './assets/images/logo.png'

function App() {
  return (
    <>
      <section>
        <div className="bg-background flex min-h-screen w-full flex-col">
          <div className="mx-auto mt-10">
            <img src={SonansLogo} alt="Sonans logo" />
          </div>
          <StudentSearchPage />
        </div>
      </section>
    </>
  )
}

export default App
