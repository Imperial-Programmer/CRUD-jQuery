let baseurl = "http://ujiapi.webhozz-training.com/api/"

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    //alert(param_x)
    if(id!=null){
        $.ajax({
            type: "GET",
            url: baseurl + "users/" + id,
            success: function (response) {
                let hasil = JSON.parse(response)
                let data = hasil.data
                //console.log(hasil);
                $("#uname").val(data.nama)
                $("#utelp").val(data.telp)
            },
            error: function(xhr, status, error) {
                alert(error)
            },
            beforeSend: function() {
                $("#tombolSubmit").html(`<img src="img/loading.gif" width="30" height="30">`)
            },
            complete: function() {
                $("#tombolSubmit").html(`<input class="submit" type="submit" value="Ubah">`)
            }
        });
    }
    

    $("#uform").validate({
        rules: {
            txt_nama: {
                required: true
            },
            txt_telp: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 11
            }
        },
        messages: {
            txt_nama: {
                required: `<span class="salah">Nama Harus Diisi</span>`
            },
            txt_telp: {
                required: `<span class="salah">Nomor Telpon Harus Diisi</span>`,
                number: `<span class="salah">Nomor Telpon Harus Diisi Dengan Angka</span>`,
                minlength: `<span class="salah">Nomor Telpon Minimal 10 Angka</span>`,
                maxlength: `<span class="salah">Nomor Telpon Maksimal 11 Angka</span>`
            }
        },
        submitHandler: function () {
            let dataForm=$("#uform").serialize()
            //alert("Berhasil Diubah")
            $.ajax({
                type: "PUT",
                url: baseurl + "users/" + id,
                data: dataForm,
                success: function (response) {
                    let hasil = JSON.parse(response)
                    let sukses = hasil.sukses
                    if(sukses == 1) {
                        alert(hasil.pesan)
                        window.location = "list.html"
                    }
                },
                error: function (xhr, status, error) {
                    alert(error)
                },
                beforeSend: function () {
                    $("#tombolSubmit").html(`<img src="img/loading.gif" width="30" height="30">`)
                },
                complete: function () {
                    $("#tombolSubmit").html(`<input class="submit" type="submit" value="Ubah">`)
                }
            });
        }
    })

    $("#valForm").validate({
        rules: {
            txt_nama: {
                required: true
            },
            txt_email: {
                required: true,
                email: true
            },
            txt_telp: {
                required: true,
                number: true,
                minlength: 10,
                maxlength: 11
            },
            txt_password: {
                required: true,
                minlength: 5
            },
            txt_ulang: {
                required: true,
                equalTo: "#vpassword"
            }
        },
        messages: {
            txt_nama: {
                required: `<span class="salah">Nama Harus Di Isi</span>`
            },
            txt_email: {
                required: `<span class="salah">Email Harus Di Isi</span>`,
                email: `<span class="salah">Email Harus DI Isi Dengan Format Valid</span>`
            },
            txt_telp: {
                required: `<span class="salah">Nomor Telpon Harus Di Isi</span>`,
                number: `<span class="salah">Nomor Telpon Harus Di Isi Dengan Angka</span>`,
                minlength: `<span class="salah">Nomor Telpon Minimal 10 Angka</span>`,
                maxlength: `<span class="salah">Nomor Telpon Maksimal 11 Angka</span>`
            },
            txt_password: {
                required: `<span class="salah">Password Harus Di Isi</span>`,
                minlength: `<span class="salah">Password Minimal 5 Huruf</span>`
            },
            txt_ulang: {
                required: `<span class="salah">Ulangi Password</span>`,
                equalTo: `<span class="salah">Wajib Sama Dengan Password</span>`
            }
        },
        submitHandler: function() {
            //alert("Berhasil!")
            let dataForm=$("#valForm").serialize()
            $.ajax({
                type: "POST",
                url: baseurl+"register",
                data: dataForm,
                success: function (response) {
                    //console.log(response);
                    let hasil = JSON.parse(response)
                    //console.log(hasil);
                    let sukses = hasil.sukses
                    if(sukses == 0) {
                        console.log(hasil.pesan)
                        alert(hasil.pesan.txt_email[0])
                    }
                    else {
                        alert(hasil.pesan)
                        window.location="login.html"
                    }
                },
                error: function (xhr, status, error) {
                    console.log(error);
                    alert(error)
                },
                beforeSend: function () {
                    $("#tombolSubmit").html(`<img src="img/loading.gif" width="30" height="30">`)
                },
                complete: function () {
                    //alert("always")
                    $("#tombolSubmit").html(`<input class="submit" type="submit" value="Daftar">`)
                }
            });
            //console.log(data);
        }
    })
    $("#formLogin").validate({
        rules: {
            txt_email: {
                required: true,
                email: true
            },
            txt_password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            txt_email: {
                required: `<span class="salah">Email Harus Di Isi</span>`,
                email: `<span class="salah">Email Harus Di Isi Dengan Format Valid</span>`
            },
            txt_password: {
                required: `<span class="salah">Password Harus Di Isi</span>`,
                minlength: `<span class="salah">Password Minimal 5 Huruf</span>`
            }
        },
        submitHandler: function() {
            //alert("Berhasil Login")
            let dataForm=$("#formLogin").serialize()
            $.ajax({
                type: "POST",
                url: baseurl + "login",
                data: dataForm,
                success: function (response) {
                    let hasil=JSON.parse(response)
                    console.log(hasil);
                    let sukses = hasil.sukses
                    if(sukses==1) {
                        let dataLogin = JSON.stringify(hasil.data)
                        localStorage.setItem("login", dataLogin)
                        //console.log(localStorage.getItem("login"));
                        window.location = "list.html"

                    }

                    alert(hasil.pesan)
                },
                error: function (xhr, status, error) {
                    console.log(error)
                    alert(error)
                },
                beforeSend: function () {
                    $("#tombolSubmit").html(`<img src="img/loading.gif" width="30" height="30">`)
                },
                complete: function () {
                    $("#tombolSubmit").html(`<input class="submit" type="submit" value="Masuk">`)
                }
            });
        }   
    })

    $("#btnLogout").click(function () {
        //alert("Berhasil Logout")
        localStorage.removeItem("login")
        window.location = "index.html"
    })

    $.ajax({
        type: "GET",
        url: baseurl + "users",
        success: function (response) {
            //console.log(response);
            let hasil = JSON.parse(response)
            let listData = hasil.data
            //console.log(listData)
            let baris = ""
            listData.forEach((item, posisi) => {
                //console.log(item.nama);
                baris += `<tr>
                    <td>${posisi+1}.</td>
                    <td>${item.nama}</td>
                    <td>${item.email}</td>
                    <td>${item.telp}</td>
                    <td>
                        <a href="#" onclick="hapusMember(${item.id}, '${item.nama}')">
                        Hapus</a>
                    </td>
                    <td>
                        <a href="ubah.html?id=${item.id}">Ubah</a>
                    </td>
                </tr>`
            });
            $("#listData").html(baris)
        },
        error: function (xhr, status, error) {
            //console.log(xhr, status, error);
            alert( error)
        },
        beforeSend: function () { 
            $("#listData").html(`<img src="img/loading.gif" width="30" height="30">`)
        }
    });

   
});

function hapusMember(id, nama){
    //alert(nama)
    let yakin = confirm(`Apakah Anda yakin mau menghapus ${nama} ?`)
    if(yakin) {
        //alert(id)
        $.ajax({
            type: "DELETE",
            url: baseurl+"users/" + id,
            success: function (response) {
                let hasil = JSON.parse(response)
                if(hasil.sukses == 1) {
                    alert(hasil.pesan)
                    window.location = "list.html"
                }
            },
            error: function (xhr, status, error) {
                console.log(error);
            }
        });
    }
}