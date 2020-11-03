const frameShell = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Downloaded frame | Sound button maker</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .downloaded-frame {
            width: 100%;
            height: 100vh;
        }

        ::-webkit-scrollbar {
            display: none;
        }
    </style>
</head>
<body>
    <iframe class="downloaded-frame" src  frameborder="0"></iframe>
</body>
</html>`;

export default frameShell;
