/* eslint-disable max-len */
import React from 'react';
import './publicHeader.scss';


const PublicHeader = () => (
    <header className="site-header">
        <div className="container">
            <div className="site-logo">
                <a href="http://www.drapenihavet.no/no/hjem/" className="sticky-retina-logo">
                    <img src="http://www.drapenihavet.no/wp-content/uploads/2016/07/Draapen-i-havet_60.png" alt="Dråpen i Havet" width="112" height="" />
                </a>
            </div>
            <a href="#" className="visible-sm visible-xs" id="menu-toggle" style={{ display: 'none' }}>
                <i className="fa fa-bars"></i>
            </a>
            <ul id="menu-hovedmeny" className="sf-menu dd-menu pull-right sf-js-enabled">
                <li className="menu-item-681 menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="http://www.drapenihavet.no/no/hjem/">home<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-682 menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <a href="http://www.drapenihavet.no/no/om-oss/" className="sf-with-ul">about us<span className="nav-line"></span>
                    </a>
                </li>
                <li className="menu-item-1070 menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="http://www.drapenihavet.no/no/stott/">support us<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-997 menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <a href="http://www.drapenihavet.no/no/bli-frivillig/" className="sf-with-ul">become volunteer<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-1316 menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <a href="http://www.drapenihavet.no/no/nyheter/" className="sf-with-ul">news<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-1279 menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children">
                    <a href="http://www.drapenihavet.no/no/presse/" className="sf-with-ul">press<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-684 menu-item menu-item-type-post_type menu-item-object-page">
                    <a href="http://www.drapenihavet.no/no/kontakt/">contact<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-685 menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-468 current_page_item">
                    <a href="http://www.drapenihavet.no/no/min-profil/">my profile<span className="nav-line"></span></a>
                </li>
                <li className="menu-item-1438-no lang-item lang-item-113 lang-item-no current-lang menu-item menu-item-type-custom menu-item-object-custom">
                    <a href="http://www.drapenihavet.no/no/min-profil/">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVHjaYnzIAAVy//9zRV36skTnATPzPwaGf2BBCOMPEgkQQCxAUcHaaiD5////ngQpRkZG4aLC/3//MPz58x+Efv//DSL/Acnfv+9u2AQQQCxgg/7/e/IUSL18/weo7c+DB0AVDL+BioCqgejXv1+//v/6zSwrC7QBIIDAGv4CVf0F0f9ADvn/5xfI1F8gpSDVQD2/QCTT799AVwEEEIvM379AZ0Cc9Aeo8/9/gbUb/mMDQGUanz4BBBAjc/D5/mTpF+9///0HdvO/f0BtQA6I/AMk//3+CxIHikgJss7OOQ0QQIx///6FGP+f4X/JgmfdcZL/cQAmJqb3798DBBDLPWZmkdysP/fuC2zY9BvspLd21v9+gXzMAPLub6g3fv9hUVa6evocQACxAL35HxxkQKUgZ/3//+8nRMUvkCBIJ4jxD+iQP8DAZgAIILCGP3+YJEEuEeUDBRqzjCzTX1DAM4CDn/nPH5Dqv3//gR0PEECMV2FRqPD+vaDeibcXzK4JC/+BxTEkghlgJBAABBgA9J5akqVspaUAAAAASUVORK5CYII=" title="Norsk Bokmål" alt="Norsk Bokmål" /><span className="nav-line"></span>
                    </a>
                </li>
                <li className="menu-item-1438-en lang-item lang-item-116 lang-item-en menu-item menu-item-type-custom menu-item-object-custom">
                    <a href="http://www.drapenihavet.no/en/profile/">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNpinDRzn5qN3uFDt16+YWBg+Pv339+KGN0rbVP+//2rW5tf0Hfy/2+mr99+yKpyOl3Ydt8njEWIn8f9zj639NC7j78eP//8739GVUUhNUNuhl8//ysKeZrJ/v7z10Zb2PTQTIY1XZO2Xmfad+f7XgkXxuUrVB6cjPVXef78JyMjA8PFuwyX7gAZj97+T2e9o3d4BWNp84K1NzubTjAB3fH0+fv6N3qP/ir9bW6ozNQCijB8/8zw/TuQ7r4/ndvN5mZgkpPXiis3Pv34+ZPh5t23//79Rwehof/9/NDEgMrOXHvJcrllgpoRN8PFOwy/fzP8+gUlgZI/f/5xcPj/69e/37//AUX+/mXRkN555gsOG2xt/5hZQMwF4r9///75++f3nz8nr75gSms82jfvQnT6zqvXPjC8e/srJQHo9P9fvwNtAHmG4f8zZ6dDc3bIyM2LTNlsbtfM9OPHH3FhtqUz3eXX9H+cOy9ZMB2o6t/Pn0DHMPz/b+2wXGTvPlPGFxdcD+mZyjP8+8MUE6sa7a/xo6Pykn1s4zdzIZ6///8zMGpKM2pKAB0jqy4UE7/msKat6Jw5mafrsxNtWZ6/fjvNLW29qv25pQd///n+5+/fxDDVbcc//P/zx/36m5Ub9zL8+7t66yEROcHK7q5bldMBAgwADcRBCuVLfoEAAAAASUVORK5CYII=" title="English" alt="English" /><span className="nav-line"></span>
                    </a>
                </li>
            </ul>
        </div>
    </header>
);

export default PublicHeader;
