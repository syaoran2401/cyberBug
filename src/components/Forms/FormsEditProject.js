import { Editor } from '@tinymce/tinymce-react'
import { withFormik } from 'formik';
import React, { useEffect, } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { GET_ALL_PROJECT_CATEGORY, UPDATED_PROJECT_SAGA } from '../../redux/types/CyberBugsType';

function FormsEditProject(props) {
    const {
        values,
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory
        );
    const dispatch = useDispatch()


    const renderArrayCategory = () => {
        return arrProjectCategory.map((item, index) => {
            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
        })
    }


    useEffect(() => {
        setFieldValue('description', values.description);

        dispatch({
            type:GET_ALL_PROJECT_CATEGORY,
        })


        // Load sự kiện submit lên drawer nút submit
        dispatch({
            type: 'SET_SUBMIT_FORM_EDIT',
            submitFunction: handleSubmit
        })
    }, []);


    const handleEditorChange = (content, editor) => {
        setFieldValue('description', content)
    };

    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-4'>
                    <div className='row'>
                        <div className='form-group'>
                            <p className='font-weight-bold'>Project ID</p>
                            <input value={values.id} disabled type="text" className='form-control' name='projectName' />
                        </div>
                    </div>
                </div>

                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Name</p>
                        <input value={values.projectName} type="text" className='form-control' name='projectName' onChange={handleChange} />
                    </div>
                </div>

                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Category</p>
                        <select name='categoryId' value={values.categoryId}>
                            {renderArrayCategory()}
                        </select>
                    </div>
                </div>

                <div className='col-12'>
                    <p className='font-weight-bold'>Description</p>
                    <Editor name="description"
                     initialValue ={values.description}
                     value ={values.description}
                    init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
                        }}
                        onEditorChange={handleEditorChange}
                    />
                </div>
            </div>
        </form>
    )
}



const editProjectForm = withFormik({
    // enableReinitialize => mỗi lần redux thay đổi thì sẽ chạy lại hàm projectSettingForm
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        return {
            id: props.projectEditInfo?.id,
            projectName: props.projectEditInfo.projectName,
            description: props.projectEditInfo.description,
            categoryId: props.projectEditInfo.categoryId,
        }
    },

    validationSchema: Yup.object().shape({
    }),

    handleSubmit: (values, { props, setSubmitting }) => {
        // Khi người dùng submit  => đưa data về backend thông wa API
        const action = {
            type:UPDATED_PROJECT_SAGA,
            projectUpdate:values
        };
        props.dispatch(action)
    },

    displayName: 'ProjectSettingFormik',
})(FormsEditProject);

const mapStateToProps = state => {
    return {
        projectEditInfo: state.ProjectReducer.projectEditInfo
    }
}
export default connect(mapStateToProps)(editProjectForm)
