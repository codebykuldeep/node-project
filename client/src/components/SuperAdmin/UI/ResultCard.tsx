import { IOrganization, IUser } from '../../../types/dataTypes'
import classes from './search-result.module.css'

interface ResultCardProps{
    label:string;
    data:IUser[]  | IOrganization[];
}

function ResultCard({label,data}:ResultCardProps) {
  return (
    <div  className={classes.result_box}>
        <div className={classes.heading}>
          <h3>{label}</h3>
        </div>
        {data.length === 0 && <p>No match found</p>}
        <div className={classes.list}>
          {data.map(({ name, id }) => (
            <>
            <p key={id}>{name}</p>
            </>
          ))}
        </div>
    </div>
  )
}

export default ResultCard