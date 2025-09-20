import QuestionOrder from "../_components/create/QuestionOrder";

const CreateFormPage = () => {
	return (
		<div className="flex flex-row h-full">
			<div className="w-1/3">
				<QuestionOrder />
			</div>
			<div className="w-full">Creator</div>
		</div>
	);
};

export default CreateFormPage;
