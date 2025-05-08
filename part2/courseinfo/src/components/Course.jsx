const Header = (props) => {
    console.log(props)
    return (
      <div>
        <h2>{props.name}</h2>
      </div>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.parts.name} {props.parts.exercises}</p>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    const diffParts = props.parts.map(element => { return <Part key={element.id} parts={element} /> } )
    
    return (
        <div>
            {diffParts}
        </div>
    )
  }
  
  const Total = (props) => {
    const totalAmount = props.parts.reduce((sum, order) => sum + order.exercises, 0)
    console.log(totalAmount)
    return (
      <div>
        <p>
          <b>
            total of {totalAmount} exercises
          </b>
        </p>
      </div>
    )
  } 

const Course = (props) => {
    console.log(props)
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export default Course;