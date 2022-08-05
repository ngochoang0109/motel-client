import { useDispatch, useSelector } from 'react-redux';
import { messageConstant } from '../../../constant/messageConstant';
import './Process.css';
import { message } from '../../../action/message';

const Process = () => {

	const controllMessage = useSelector((state) => state.controllMessage);
	const dispatch= useDispatch();

	const handleConfirmMessage = () => {
		dispatch(message.buttonCloseMessage())
	}

	const handleMessage = () => {
		switch (controllMessage.type) {
			case messageConstant.MESSAGE_INFORMATION:
				return <div className="ldio-igbfkknmud">
					<div></div><div></div><div></div><div></div><div></div>
				</div>
			case messageConstant.MESSAGE_SUCCESSFULY:
				return <div className='text-center'>
					<p>{controllMessage.message}</p>
					<div className='button-process'>
						<button onClick={handleConfirmMessage}>Đóng</button>
					</div>
				</div>
			case messageConstant.MESSAGE_ERRO:
				return <div className='text-center'>
					<p>{controllMessage.message}</p>
					<div className='button-process'>
						<button onClick={handleConfirmMessage}>Đóng</button>
					</div>
				</div>
		}
	}
	return (controllMessage.show ? <div className='process-component'>
		<div className="loadingio-spinner-ellipsis-qwd1a3r98o">
			{handleMessage()}
		</div>
	</div> : null)
}

export default Process;