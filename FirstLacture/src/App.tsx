import './App.css'
import { Combiane } from './components/Events/Combine'
import { Greet } from './components/Greet'
import { Heading } from './components/Heading'
import { Oscar } from './components/Oscar'
import { Person } from './components/Person'
import { Personlist } from './components/Personlist'
import { User } from './components/States/User'
import { Status } from './components/Status'
import { Style } from './components/Style/Style'

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
      <Status />
      <Oscar>
        <Heading status={"Success"}>This is children components</Heading>
      </Oscar>
      <Combiane />
      <Style styles={{ border: "1px solid black", padding: "10px", backgroundColor: "aqua" }} />
      <User />
    </div>
  )
}

export default App
