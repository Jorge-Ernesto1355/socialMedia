import { Skeleton } from "antd"

export const SkeletonsSquare = ()=>{

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
       <ul className="photos-body">
       
       {array.map((number)=> (
        <li key={number}  className={`photos-item${number}`}>
        <Skeleton.Avatar shape="square" active={true} size={120}/>
      </li>
       ))}
       </ul>
    )
   }