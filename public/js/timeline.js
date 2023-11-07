function initializeTimeline() {
    var googleSheetURL = "<iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1D0m893M2wtgmfm8nNHBSESY4TxrtO7VvW-DHs345wSA&font=Default&lang=en&initial_zoom=2&height=650' width='100%' height='650' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0'></iframe>";
    var options = {
        width: "100%",
        height: "650",
        source: googleSheetURL,
        start_at_end: false,
    };

    var timeline = new TL.Timeline('timeline', options);
}
document.addEventListener('DOMContentLoaded', initializeTimeline);