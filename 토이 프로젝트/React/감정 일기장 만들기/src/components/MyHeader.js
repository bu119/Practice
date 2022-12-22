const MyHeader = ({headText, headSelectMonth, leftChild, rightChild}) =>{

  return <header>
    <div className="head_btn_left">
      {leftChild}
    </div>
    <div className="head_date">
      <div className="head_text">
        {headText}
      </div>
      <div className="head_month">
        {headSelectMonth}
      </div>
    </div>
    <div className="head_btn_right">
      {rightChild}
    </div>
  </header>
}

export default MyHeader