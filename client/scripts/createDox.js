const url = 'http://localhost:3050/api/';

window.onload = async () => {
    const awards = await fetch(`${url}award`).then(data => data.json());
    const genres = await fetch(`${url}genre`).then(data => data.json());
    const descriptions = await fetch(`${url}description`).then(data => data.json());

    const generateButton = document.getElementById('generateDocx');

    function generate() {
        const doc = new docx.Document();

        doc.addSection({
            properties: {},
            children: [
                createTable(descriptions),
                createCellText(""),
                createTable(genres),
                createCellText(""),
                createTable(awards)
            ],
        });

        docx.Packer.toBlob(doc).then(blob => {
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }

    generateButton.addEventListener('click', generate);
}
const createCellText = (text, textAttributes) => {

    return new docx.Paragraph({
        children: [
            new docx.TextRun({
                text: text,
                ...textAttributes
            })
        ]
    })
}

const createCell = (data, textAttributes) => {

    return new docx.TableCell({
        children: [createCellText(data, textAttributes)]
    });
}

const createRow = (cells, textAttributes = {}, rowAttributes = {}) => {
    const children = cells.map(cellText => createCell(cellText, textAttributes));

    return new docx.TableRow({
        children,
        ...rowAttributes
    })
}

const createHeaderRow = (object) => {

    return createRow(Object.keys(object), {bold: true}, {tableHeader: true})
}

const createSimpleRow = (object) => {
    return createRow(Object.values(object))
}


const createTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
        return;
    }

    const rows = [];
    const headerRow = createHeaderRow(data[0]);

    rows.push(headerRow);
    data.forEach(row => {
        rows.push(createSimpleRow(row));
    })

    return new docx.Table({
        rows
    })
}