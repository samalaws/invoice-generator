import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Preview from './Preview.jsx';
import { useLocation } from 'wouter';

// function to handle pdf page generator
function PdfGenerator(contentRef, fileName) {
	html2canvas(contentRef)
		.then((canvas) => {
			const imgData = canvas.toDataURL('image/png');
			const pdf = new jsPDF();
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
			pdf.save(fileName);
		})
		.catch((error) => {
			console.error('Error generating PDF:', error);
		});
}

// handle create pdf button
const CreatePdfPage = () => {
	const [, setLocation] = useLocation();
	const backLink = '/add-product';
	const contentRef = useRef(null);

	const handleDownloadPDF = () => {
		if (!contentRef.current) {
			console.error('Content ref not available for PDF generation.');
			return;
		}
		PdfGenerator(contentRef.current, 'invoice.pdf');
	};

	// handle back button
	const handleBack = () => {
		setLocation(backLink);
	};

	// handle close button
	const handleClose = () => {
		localStorage.removeItem('productsInfo'); // clear local storage products Info
		localStorage.removeItem('companyInfo'); // clear local storage company Info
		localStorage.removeItem('customerInfo'); // clear local storage customer Info
		setLocation('/'); // go back to home page
	};

	return (
		<div>
			<div className="pdf-container">
				<Preview ref={contentRef} />
				<div className="button-container">
					<button onClick={handleBack}>Zurück</button>
					<button onClick={handleDownloadPDF}>ٌRechnung generieren</button>
					<button onClick={handleClose}>Rechnung schließen</button>
				</div>
			</div>
		</div>
	);
};

export default CreatePdfPage;
