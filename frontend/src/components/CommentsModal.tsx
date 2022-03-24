import useTypedSelector from "../hooks/useTypesSelector"
import { selectCurrentModal } from "../redux/reducers/ui"
import Modal from "./Modal"



const CommentsModal = () => {

  const isOpen = useTypedSelector((state) => selectCurrentModal(state)) === 'comments'

  return (
    <Modal isOpen={isOpen} title='Comments'>
      Comments
    </Modal>
  )
}

export default CommentsModal
