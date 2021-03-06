<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="lib/bootstrap.css">
    <script src="lib/jquery.js"></script>
</head>

<body>
    <input type="file" name="" id="file1">
    <button type="submit" id="btnUpload">上传文件</button>

    <div class="progress" style="width:400px">
        <div class="progress-bar progress-bar-striped active" role="progressbar" id="percent">

        </div>
    </div>

    <img src="" alt="" id="img">
    <script>
        // 1.获取上传文件按钮
        var btnUpload = document.querySelector('#btnUpload');
        // 2.监听上传文件按钮点击事件
        btnUpload.addEventListener('click', function() {
            var files = document.querySelector('#file1').files;
            console.log(files);
            if (files.length <= 0) return alert('请上传文件');

            // 3.将用户上传的文件添加到formData中
            var fd = new FormData();
            console.log(fd);
            var a = fd.append('avatar', files[0]);
            // console.log(a);

            // 4.使用xhr发送请求
            var xhr = new XMLHttpRequest();
            console.log(xhr);

            // 5.查看上传进度
            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    var procentComplete = Math.ceil((e.loaded / e.total) * 100);
                    $('#percent').attr('style', 'width:' + procentComplete + '%').html(procentComplete + '%');

                    if (procentComplete == 100) {
                        $('#percent').removeClass().addClass('progress-bar progress-bar-success active')
                    }

                }
            }


            xhr.open('POST', 'http://www.liulongbin.top:3006/api/upload/avatar');
            xhr.send(fd);

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText);
                    var data = JSON.parse(xhr.responseText);
                    if (data.status !== 200) return alert('图片上传失败');
                    document.querySelector('#img').src = 'http://www.liulongbin.top:3006' + data.url;
                }
            }

        })
    </script>
</body>

</html>