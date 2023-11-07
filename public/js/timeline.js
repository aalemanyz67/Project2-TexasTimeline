function initializeTimeline() {
    var googleSheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSyVRqfse16715R8fj09rH40ij6PAbcZChVU2rhXPisyOaPGTfnIGttkxORJacY7jG37sPxWgkdIiEP/pubhtml?gid=0&single=true";
    var options = {
        width: "100%",
        height: "600",
        source: googleSheetURL,
        start_at_end: false,
    };

    var timeline = new TL.Timeline('timeline', options);
}
document.addEventListener('DOMContentLoaded', initializeTimeline);