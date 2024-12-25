import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { BACKENDURL } from '../config';

function QuotationForm() {
    const { jobId } = useParams(); // Get the jobId from the URL
    const [quotation, setQuotation] = useState('');
    const navigate = useNavigate();

    const handleQuotationChange = (event) => {
        setQuotation(event.target.value); // Update the quotation text
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${BACKENDURL}/api/apply-job/${jobId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quotation }),
            });

            if (response.ok) {
                toast.success('Your quotation has been submitted!');
                navigate('/applied-jobs'); // Redirect to the Applied Jobs page
            } else {
                toast.error('Failed to submit your quotation.');
            }
        } catch (error) {
            console.error('Error submitting quotation:', error);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header} className='font-rubik'>Submit Your Quotation</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <textarea
                    value={quotation}
                    onChange={handleQuotationChange}
                    placeholder="Enter your quotation"
                    rows="5"
                    style={styles.textarea}
                ></textarea>
                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.button} className='w-fit'>Submit</button>
                    <button type="button" onClick={() => navigate('/')} style={styles.button} className='w-fit'>Cancel</button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: '20px',
    },
    header: {
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    textarea: {
        marginBottom: '10px',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default QuotationForm;
