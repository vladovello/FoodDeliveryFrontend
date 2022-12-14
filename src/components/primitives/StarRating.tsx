import StarIcon from 'components/icons/StarIcon'
import { regularText } from 'Styles'

export default function StarRating() {
  return (
    <div className="flex items-center">
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <StarIcon />
      <p className={'ml-2 font-normal text-gray-900' + regularText}>4.95 out of 5</p>
    </div>
  )
}
