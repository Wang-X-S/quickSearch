$('.addButton').on('click',()=>{
    console.log('123')
    let url = window.prompt(
        '请输入你要添加的网址'
    )

    if(url.indexOf('http')!==0){
            url = 'https://' + url
    }
    console.log(url)
    const $siteList = $('.siteList')
    const $addWeb = $('.addWeb')
    const $li = $(`
            <a href="${url}">
                <li class="last">
                    <div class="site">
                        <div class="logo">
                            ${url[0]}
                        </div>
                        <dig class="link">${url}</dig>
                    </div>
                </li>
           </a>`).insertBefore('.addWeb')
})