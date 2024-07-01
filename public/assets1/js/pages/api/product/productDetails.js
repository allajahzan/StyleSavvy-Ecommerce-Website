
function loadProducts() {
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none'
        document.getElementById('products').style.display = 'block'
    }, 400);


    // file uploading and croping for varinet adding

    const imageInputs = [
        document.getElementById('imageInput1'),
        document.getElementById('imageInput2'),
        document.getElementById('imageInput3'),
        document.getElementById('imageInput4')
    ];
    const cropContainer = document.getElementById('crop-container');
    const cropImage = document.getElementById('crop-image');
    const cropButton = document.getElementById('crop-button');
    let cropper;
    let currentInput;
    let currentPreview;

    imageInputs.forEach(input => {
        input.addEventListener('change', function (event) {
            document.getElementById('crop-button').style.display = 'block'
            cropContainer.style.display = 'block'
            currentPreview = document.getElementById(`imagePreview${imageInputs.indexOf(input) + 1}`);
            currentPreview.innerHTML = ''
            currentInput = input;
            const file = event.target.files[0];
            input.value = '';
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    cropImage.src = e.target.result;
                    cropContainer.style.display = 'block';
                    if (cropper) {
                        cropper.destroy();
                    }
                    cropper = new Cropper(cropImage, {
                        aspectRatio: 0.72,
                        viewMode: 1,
                        movable: false,
                        zoomable: false,
                        rotatable: false,
                        scalable: false,
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    });

    cropButton.addEventListener('click', () => {
        if (cropper) {

            const canvas = cropper.getCroppedCanvas();
            const croppedImageDataURL = canvas.toDataURL();
            // You can now use croppedImageDataURL to display the cropped image or send it to the server
            // console.log(croppedImageDataURL);
            cropContainer.style.display = 'none';

            // Show the cropped image in the preview
            currentPreview.innerHTML = '';
            const imgElement = document.createElement('img');
            imgElement.src = croppedImageDataURL;
            imgElement.style.maxWidth = '100%';
            currentPreview.appendChild(imgElement);

            // Here we can reset the file input and update it with the cropped image
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(new File([dataURLtoBlob(croppedImageDataURL)], 'cropped.png', { type: 'image/png' }));
            currentInput.files = dataTransfer.files;
        }
    });

    function dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    // file upload and cropping for varient editing

    const imageInputs1 = [
        document.getElementById('imageInput11'),
        document.getElementById('imageInput22'),
        document.getElementById('imageInput33'),
        document.getElementById('imageInput44')
    ];
    const cropContainer1 = document.getElementById('crop-container1');
    const cropImage1 = document.getElementById('crop-image1');
    const cropButton1 = document.getElementById('crop-button1');
    let cropper1;
    let currentInput1;
    let currentPreview1;

    imageInputs1.forEach(input => {
        input.addEventListener('change', function (event) {
            document.getElementById('crop-button1').style.display = 'block'
            currentPreview1 = document.getElementById(`imagePreview${imageInputs1.indexOf(input) + 1}${imageInputs1.indexOf(input) + 1}`);
            currentPreview1.innerHTML = ''
            currentInput1 = input;
            const file = event.target.files[0];
            input.value = ''
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    cropImage1.src = e.target.result;
                    cropContainer1.style.display = 'block';
                    if (cropper1) {
                        cropper1.destroy();
                    }
                    cropper1 = new Cropper(cropImage1, {
                        aspectRatio: 0.72,
                        viewMode: 1,
                        movable: false,
                        zoomable: false,
                        rotatable: false,
                        scalable: false,
                    });
                };
                reader.readAsDataURL(file);
            }
        });
    });

    cropButton1.addEventListener('click', () => {
        if (cropper1) {

            const canvas = cropper1.getCroppedCanvas();
            const croppedImageDataURL = canvas.toDataURL();
            // You can now use croppedImageDataURL to display the cropped image or send it to the server
            // console.log(croppedImageDataURL);
            cropContainer1.style.display = 'none';

            // Show the cropped image in the preview
            currentPreview1.innerHTML = '';
            const imgElement = document.createElement('img');
            imgElement.src = croppedImageDataURL;
            imgElement.style.maxWidth = '100%';
            currentPreview1.appendChild(imgElement);

            // Here we can reset the file input and update it with the cropped image
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(new File([dataURLtoBlob(croppedImageDataURL)], 'cropped.png', { type: 'image/png' }));
            currentInput1.files = dataTransfer.files;
        }
    });

    function dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

}

// get add varients modal

function addNewVarient(id) {
    document.getElementById('product_id').value = id
    $('#varient').modal('show')
    document.getElementById('close_btn').setAttribute('onclick', `clearAllForm()`);
}


// add  varients



async function addVarient() {

    // Get form data

    const formData = new FormData();

    formData.append('pId', document.getElementById('product_id').value)
    formData.append('color', document.getElementById('select_color').value);
    formData.append('actualPrice', document.getElementById('pprice').value)

    const sizes = document.getElementById('sizes_length').value;
    const size = [];
    const stock = [];
    const price = [];

    for (let i = 0; i < sizes; i++) {
        const sizeValue = document.getElementById('size' + i).value;
        const stockValue = parseInt(document.getElementById('quantity' + i).value);
        const priceValue = parseFloat(document.getElementById('pprice').value);

        if (stockValue && priceValue) {
            size.push(sizeValue);
            stock.push(stockValue);
            price.push(priceValue);
        }
    }



    formData.append('size', size);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('file1', document.getElementById('imageInput1').files[0]);
    formData.append('file2', document.getElementById('imageInput2').files[0]);
    formData.append('file3', document.getElementById('imageInput3').files[0]);
    formData.append('file4', document.getElementById('imageInput4').files[0]);

    if (size.length > 0 && stock.length > 0 && price.length > 0) {
        $('#varient').modal('hide');
        try {
            const resp = await fetch('/admin/addVarients', {
                method: 'POST',
                body: formData
            })

            const data = await resp.json()

            if (data.type === 'redirect') {
                window.location.href = '/admin/signIn'
            }
            else if (data.type === 'error') {
                document.getElementById('error_p').innerHTML = data.msg
                document.getElementById('error_symbol').style.color = 'red'
                document.getElementById('error_symbol').innerHTML = 'error'
                document.getElementById('ok_btn').setAttribute('onclick', `getVarientAddModal()`);
                const myModal = new bootstrap.Modal(document.getElementById('message'));
                myModal.show();
            } else {


                const tableBody = document.getElementById('tableBody_listed');
                tableBody.innerHTML = '';

                // Define the formatDate function to format the date string
                function formatDate(dateString) {
                    const date = new Date(dateString);
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    return date.toLocaleDateString('en-GB', options);
                }

                function formatLocalTime(dateString) {
                    const date = new Date(dateString);
                    return date.toLocaleTimeString();
                }

                // Loop through the variants and create table rows
                data.varients.reverse().forEach((v) => {
                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
        <td class="image_"><img src="/products/uploads/${v.images[0]}" alt=""></td>
        <td>${v.color.color_name}</td>
        <td>${formatDate(v.addedDateTime)}, ${formatLocalTime(v.addedDateTime)}</td> 
        <td class="btn_">
            <button class="edit_">Edit</button>
        </td>
        <td class="btn_">
            <button class="unlist_">Unlist</button>
        </td>
        <td>Listed</td>
    `;
                    tableBody.appendChild(newRow);
                });


                document.getElementById('close_btn').removeAttribute('onclick', `deleteProduct('${data.varients[0].product}')`);
                document.getElementById('close_btn').setAttribute('onclick', `clearAllForm('${data.varients[0].product}')`);
                document.getElementById('btn_close1').setAttribute('onclick', `clearAllForm('${data.varients[0].product}')`);
                document.getElementById('add_another').setAttribute('onclick', `addAnotherVarient()`);
                document.getElementById('error_p1').innerHTML = data.msg
                document.getElementById('error_symbol1').style.color = 'green'
                document.getElementById('error_symbol1').innerHTML = 'task_alt'
                const myModal = new bootstrap.Modal(document.getElementById('message1'));
                myModal.show();
            }
        } catch (err) {
            console.log(err);
            window.location.href = '/admin/500-Server-Error'
        }
    }
}


// get varient add form

function getVarientAddModal() {
    const myModal = new bootstrap.Modal(document.getElementById('varient'));
    myModal.show();
}



// add anotehr varient

function addAnotherVarient() {
    document.getElementById('add_varient_form').reset()
    document.getElementById('imagePreview1').innerHTML = ''
    document.getElementById('imagePreview2').innerHTML = ''
    document.getElementById('imagePreview3').innerHTML = ''
    document.getElementById('imagePreview4').innerHTML = ''
    const myModal = new bootstrap.Modal(document.getElementById('varient'));
    myModal.show();
}

// get edit vareint modal

function editAVarient(pid, vid, color, colorId, image1, image2, image3, image4, price) {

    document.getElementById('product_id1').value = pid
    document.getElementById('varirent_id').value = vid
    document.getElementById('pprice_edit').value = price
    document.getElementById('old_color').value = colorId

    const select = document.getElementById('select_edit_color');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === color) {
            select.selectedIndex = i;
            break;
        }
    }


    // const select2 = document.getElementById('select_edit_size');
    // for (let i = 0; i < select2.options.length; i++) {
    //     if (select2.options[i].text === size) {
    //         select2.selectedIndex = i;
    //         break;
    //     }
    // }

    const preview1 = document.getElementById('imagePreview11')
    const img1 = document.createElement('img');
    img1.src = `/products/uploads/${image1}`;
    preview1.appendChild(img1);

    const preview2 = document.getElementById('imagePreview22')
    const img2 = document.createElement('img');
    img2.src = `/products/uploads/${image2}`;
    preview2.appendChild(img2);

    const preview3 = document.getElementById('imagePreview33')
    const img3 = document.createElement('img');
    img3.src = `/products/uploads/${image3}`;
    preview3.appendChild(img3);

    const preview4 = document.getElementById('imagePreview44')
    const img4 = document.createElement('img');
    img4.src = `/products/uploads/${image4}`;
    preview4.appendChild(img4);

    document.getElementById('close_btn1').setAttribute('onclick', `clearAllEditForm()`);

    $('#varientEdit').modal('show')
}

// clear all form data after adding varients

function clearAllForm(id) {
    document.getElementById('add_varient_form').reset()
    document.getElementById('imagePreview1').innerHTML = ''
    document.getElementById('imagePreview2').innerHTML = ''
    document.getElementById('imagePreview3').innerHTML = ''
    document.getElementById('imagePreview4').innerHTML = ''
    if (id !== undefined) {
        setTimeout(() => {
            window.location.href = `/admin/products?id=${id}&isListed=${true}`
        }, 400)
    }
}


// edit varients

async function editVarient() {


    $('#varientEdit').modal('hide');
    // Get form data
    const formData = new FormData();

    formData.append('pId', document.getElementById('product_id1').value)
    formData.append('vId', document.getElementById('varirent_id').value)
    formData.append('color', document.getElementById('select_edit_color').value);
    formData.append('oldColor', document.getElementById('old_color').value);
    formData.append('price', document.getElementById('pprice_edit').value);
    formData.append('file1', document.getElementById('imageInput11').files[0]);
    formData.append('file2', document.getElementById('imageInput22').files[0]);
    formData.append('file3', document.getElementById('imageInput33').files[0]);
    formData.append('file4', document.getElementById('imageInput44').files[0]);


    try {
        const resp = await fetch('/admin/editVarients', {
            method: 'PATCH',
            body: formData
        })

        const data = await resp.json()

        if (data.type === 'redirect') {
            window.location.href = '/admin/signIn'
        }
        else if (data.type === 'error') {
            document.getElementById('ok_btn').removeAttribute('onclick', `clearAllEditForm('${document.getElementById('product_id1').value}')`);
            document.getElementById('error_p').innerHTML = data.msg
            document.getElementById('error_symbol').style.color = 'red'
            document.getElementById('error_symbol').innerHTML = 'error'
            document.getElementById('ok_btn').setAttribute('onclick', `getVarientEditModal('${data.varients.product}','${data.varients._id}','${data.varients.color.color_name}','${data.varients.images[0]}','${data.varients.images[1]}','${data.varients.images[2]}','${data.varients.images[3]}')`);
            const myModal = new bootstrap.Modal(document.getElementById('message'));
            myModal.show();
            // alert(data.msg)
        } else {

            // Define the formatDate function to format the date string
            function formatDate(dateString) {
                const date = new Date(dateString);
                const options = { day: 'numeric', month: 'long', year: 'numeric' };
                return date.toLocaleDateString('en-GB', options);
            }

            function formatLocalTime(dateString) {
                const date = new Date(dateString);
                return date.toLocaleTimeString();
            }

            // alert(data.msg)


            const id = document.getElementById('varirent_id').value
            document.getElementById('varient_image' + id).src = `/products/uploads/${data.varients.images[0]}`
            document.getElementById('p_stock_details1' + id).innerHTML = data.varients.color.color_name


            const time = formatDate(data.varients.addedDateTime)
            const date = formatLocalTime(data.varients.addedDateTime)

            document.getElementById('data_time' + id).innerHTML = time + ' ' + date

            document.getElementById('ok_btn').setAttribute('onclick', `clearAllEditForm('${document.getElementById('product_id1').value}')`);
            document.getElementById('error_p').innerHTML = data.msg
            document.getElementById('error_symbol').style.color = 'green'
            document.getElementById('error_symbol').innerHTML = 'task_alt'
            const myModal = new bootstrap.Modal(document.getElementById('message'));
            myModal.show();
        }
    } catch (err) {
        console.log(err);
        window.location.href = '/admin/500-Server-Error'
    }
}

// show modal

// get verient edit form

function getVarientEditModal(pid, vid, color, image1, image2, image3, image4) {

    document.getElementById('imagePreview11').innerHTML = ''
    document.getElementById('imagePreview22').innerHTML = ''
    document.getElementById('imagePreview33').innerHTML = ''
    document.getElementById('imagePreview44').innerHTML = ''
    document.getElementById('imageInput11').value = ''
    document.getElementById('imageInput22').value = ''
    document.getElementById('imageInput33').value = ''
    document.getElementById('imageInput44').value = ''

    document.getElementById('product_id1').value = pid
    document.getElementById('varirent_id').value = vid


    const select = document.getElementById('select_edit_color');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text === color) {
            select.selectedIndex = i;
            break;
        }
    }


    // const select2 = document.getElementById('select_edit_size');
    // for (let i = 0; i < select2.options.length; i++) {
    //     if (select2.options[i].text === size) {
    //         select2.selectedIndex = i;
    //         break;
    //     }
    // }

    const preview1 = document.getElementById('imagePreview11')
    const img1 = document.createElement('img');
    img1.src = `/products/uploads/${image1}`;
    preview1.appendChild(img1);

    const preview2 = document.getElementById('imagePreview22')
    const img2 = document.createElement('img');
    img2.src = `/products/uploads/${image2}`;
    preview2.appendChild(img2);

    const preview3 = document.getElementById('imagePreview33')
    const img3 = document.createElement('img');
    img3.src = `/products/uploads/${image3}`;
    preview3.appendChild(img3);

    const preview4 = document.getElementById('imagePreview44')
    const img4 = document.createElement('img');
    img4.src = `/products/uploads/${image4}`;
    preview4.appendChild(img4);



    const myModal = new bootstrap.Modal(document.getElementById('varientEdit'));
    myModal.show();
}


// clear all edit form data after editin varients

function clearAllEditForm(id) {
    // document.getElementById('edit_varient_form').reset()
    setTimeout(() => {
        document.getElementById('imagePreview11').innerHTML = ''
        document.getElementById('imagePreview22').innerHTML = ''
        document.getElementById('imagePreview33').innerHTML = ''
        document.getElementById('imagePreview44').innerHTML = ''
        document.getElementById('imageInput11').value = ''
        document.getElementById('imageInput22').value = ''
        document.getElementById('imageInput33').value = ''
        document.getElementById('imageInput44').value = ''
    }, 200)
    if (id !== undefined) {
        setTimeout(() => {
            window.location.href = `/admin/products?id=${id}&isListed=${true}`
        }, 400)
    }
}


// get unlist modal

function getDataToUnlist(pId, vId, color) {

    document.getElementById('name_').innerHTML = color + ' color';

    const confirmButton = document.getElementById('confirm_btn');
    confirmButton.setAttribute('onclick', `unlistVarient('${vId}', '${pId}')`);
}


// unslist a varient

async function unlistVarient(vId, pId) {


    const obj = {
        vId: vId,
        pId: pId
    }

    try {

        const resp = await fetch(`/admin/varient/unlist`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await resp.json()

        if (data.type === 'redirect') {
            window.location.href = '/admin/signIn'
        }
        else if (data.type === 'success') {
            const row = document.getElementById('row' + vId)
            row.style.display = 'none'

            document.getElementById('ok_btn').removeAttribute('onclick', `clearAllEditForm('${document.getElementById('product_id1').value}')`);
            document.getElementById('error_p').innerHTML = data.msg
            document.getElementById('error_symbol').style.color = 'green'
            document.getElementById('error_symbol').innerHTML = 'task_alt'
            const myModal = new bootstrap.Modal(document.getElementById('message'));
            myModal.show();

        }

    } catch (err) {

        console.log(err);
        window.location.href = '/admin/500-Server-Error'
    }

}


// get stock details page
function getStockDetails(vId) {
    window.location.href = `/admin/variant?vid=${vId}`
}