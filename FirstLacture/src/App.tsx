import './App.css'
import { Greet } from './components/Greet'
import { Person } from './components/Person'
import { Personlist } from './components/Personlist'

function App() {

  const obj = {
    firstName: "Nikumbhe",
    lastName: "Divyesh"
  }
  const listofStudent = [
    {
      name: "Prem",
      marks: 97,
      isPass: true
    },
    {
      name: "Sumit",
      marks: 84,
      isPass: true
    },
    {
      name: "Sanju",
      marks: 92,
      isPass: true
    }
  ]
  return (
    <div>
      <Greet />
      <Person fullname={obj} />
      <Personlist students={listofStudent} />
    </div>
  )
}

export default App
