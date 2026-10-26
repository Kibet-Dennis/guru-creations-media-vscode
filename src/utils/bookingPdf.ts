import { jsPDF } from 'jspdf';
import { Booking } from '../types';
import { COMPANY_INFO } from '../data/mockData';

const printableText = (value: string) =>
  value.normalize('NFKD').replace(/[^\x20-\x7E]/g, '?');

const colors = {
  ink: [20, 22, 34] as const,
  gold: [212, 175, 55] as const,
  green: [0, 168, 89] as const,
  text: [40, 43, 54] as const,
  muted: [112, 117, 130] as const,
  border: [226, 229, 235] as const,
  soft: [247, 248, 250] as const,
  white: [255, 255, 255] as const,
};

export const createBookingPdf = (booking: Booking): File => {
  const pdf = new jsPDF({ format: 'a4', unit: 'mm' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  const columnGap = 5;
  const columnWidth = (contentWidth - columnGap) / 2;
  let y = 0;

  const drawPageHeader = (continuation = false) => {
    pdf.setFillColor(...colors.ink);
    pdf.rect(0, 0, pageWidth, continuation ? 27 : 51, 'F');
    pdf.setFillColor(...colors.gold);
    pdf.rect(0, continuation ? 26 : 49, pageWidth, 2, 'F');

    if (continuation) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(...colors.white);
      pdf.text(printableText(`${COMPANY_INFO.name}  |  BOOKING REQUEST`), margin, 12);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(205, 208, 216);
      pdf.text(printableText(booking.referenceNumber), pageWidth - margin, 12, { align: 'right' });
      y = 36;
      return;
    }

    pdf.setFillColor(...colors.gold);
    pdf.roundedRect(margin, 10, 18, 18, 3, 3, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(...colors.ink);
    pdf.text('GC', margin + 9, 21, { align: 'center' });

    pdf.setTextColor(...colors.white);
    pdf.setFontSize(14);
    pdf.text(printableText(COMPANY_INFO.name), margin + 24, 16);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(210, 213, 220);
    pdf.text(printableText(COMPANY_INFO.slogan), margin + 24, 22);
    pdf.text(
      printableText(`${COMPANY_INFO.location}  |  ${COMPANY_INFO.phone}  |  ${COMPANY_INFO.email}`),
      margin + 24,
      28
    );

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    pdf.setTextColor(...colors.white);
    pdf.text('PRODUCTION BOOKING REQUEST', margin, 40);

    const badgeWidth = 47;
    pdf.setFillColor(45, 48, 61);
    pdf.roundedRect(pageWidth - margin - badgeWidth, 34, badgeWidth, 10, 2, 2, 'F');
    pdf.setFontSize(7);
    pdf.setTextColor(255, 224, 142);
    pdf.text('AWAITING CONFIRMATION', pageWidth - margin - badgeWidth / 2, 40.5, {
      align: 'center',
    });
    y = 61;
  };

  const addPage = () => {
    pdf.addPage();
    drawPageHeader(true);
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - 21) addPage();
  };

  const drawSection = (title: string) => {
    ensureSpace(11);
    pdf.setFillColor(...colors.soft);
    pdf.roundedRect(margin, y, contentWidth, 7, 1.5, 1.5, 'F');
    pdf.setFillColor(...colors.gold);
    pdf.roundedRect(margin, y, 1.5, 7, 0.7, 0.7, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(...colors.ink);
    pdf.text(printableText(title.toUpperCase()), margin + 5, y + 4.8);
    y += 10;
  };

  const drawRow = (left: [string, string], right?: [string, string]) => {
    const leftLines = pdf.splitTextToSize(printableText(left[1]), columnWidth - 10);
    const rightLines = right
      ? pdf.splitTextToSize(printableText(right[1]), columnWidth - 10)
      : [];
    const valueHeight = Math.max(leftLines.length, rightLines.length, 1) * 4.3;
    const cardHeight = Math.max(13, 9 + valueHeight);
    ensureSpace(cardHeight + 2);

    const drawCard = (x: number, field: [string, string], lines: string[]) => {
      pdf.setFillColor(...colors.white);
      pdf.setDrawColor(...colors.border);
      pdf.setLineWidth(0.25);
      pdf.roundedRect(x, y, columnWidth, cardHeight, 1.5, 1.5, 'FD');
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);
      pdf.setTextColor(...colors.muted);
      pdf.text(printableText(field[0].toUpperCase()), x + 5, y + 4.5);
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(...colors.text);
      pdf.text(lines, x + 5, y + 9);
    };

    drawCard(margin, left, leftLines);
    if (right) drawCard(margin + columnWidth + columnGap, right, rightLines);
    y += cardHeight + 2;
  };

  const drawNote = (label: string, value: string) => {
    const lines = pdf.splitTextToSize(printableText(value), contentWidth - 10);
    const noteHeight = Math.max(21, 13 + lines.length * 4.3);
    ensureSpace(noteHeight + 3);
    pdf.setFillColor(255, 251, 238);
    pdf.setDrawColor(240, 224, 177);
    pdf.roundedRect(margin, y, contentWidth, noteHeight, 1.5, 1.5, 'FD');
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(7);
    pdf.setTextColor(140, 106, 25);
    pdf.text(printableText(label.toUpperCase()), margin + 5, y + 6);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(...colors.text);
    pdf.text(lines, margin + 5, y + 12);
    y += noteHeight + 3;
  };

  drawPageHeader();

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(...colors.muted);
  pdf.text(`REQUEST REFERENCE  ${printableText(booking.referenceNumber)}`, margin, y);
  pdf.text(`SUBMITTED  ${printableText(booking.createdAt)}`, pageWidth - margin, y, {
    align: 'right',
  });
  y += 7;

  drawSection('Client & contact');
  drawRow(['Client name', booking.clientName], ['Organization', booking.organization || 'Not provided']);
  drawRow(['Email address', booking.email], ['Phone / WhatsApp', booking.phone]);

  drawSection('Event details');
  drawRow(['Event type', booking.eventType], ['Service requested', booking.serviceCategory]);
  drawRow(['Event date', booking.eventDate], ['Schedule', `${booking.startTime} - ${booking.endTime}`]);
  drawRow(['Venue / location', booking.location]);

  drawSection('Production requirements');
  drawRow(
    ['Estimated budget', `KES ${booking.estimatedBudgetKES.toLocaleString()}`],
    ['Expected guests', booking.guestCount ? String(booking.guestCount) : 'Not provided']
  );
  drawRow(
    ['Camera coverage', `${booking.camerasRequired} camera${booking.camerasRequired === 1 ? '' : 's'}`],
    ['Livestream platform', booking.livestreamPlatform || 'Not provided']
  );

  drawSection('Additional notes');
  drawNote('Special instructions', booking.specialRequirements || 'No special requirements provided.');

  ensureSpace(23);
  pdf.setFillColor(...colors.ink);
  pdf.roundedRect(margin, y, contentWidth, 17, 2, 2, 'F');
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(...colors.white);
  pdf.text('WHAT HAPPENS NEXT?', margin + 5, y + 6);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(220, 222, 228);
  pdf.text(
    'Our team will review availability and requirements, then contact you with confirmation and an official quotation.',
    margin + 5,
    y + 11,
    { maxWidth: contentWidth - 10 }
  );

  const pageCount = pdf.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    pdf.setPage(page);
    pdf.setDrawColor(...colors.border);
    pdf.setLineWidth(0.25);
    pdf.line(margin, pageHeight - 13, pageWidth - margin, pageHeight - 13);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(...colors.muted);
    pdf.text(
      'Booking request only - not a confirmed reservation or final quotation.',
      margin,
      pageHeight - 8
    );
    pdf.text(`Page ${page} of ${pageCount}`, pageWidth - margin, pageHeight - 8, {
      align: 'right',
    });
  }

  const fileName = `Guru-Creations-Booking-${booking.referenceNumber}.pdf`;
  return new File([pdf.output('blob')], fileName, { type: 'application/pdf' });
};

export const downloadBookingPdf = (file: File) => {
  const url = URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.name;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
};
