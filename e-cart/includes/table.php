<?php
require_once("includes/classes/createTable.php");
$page=isset($_GET["page"]) ? $_GET["page"] : 1;
$pageSize = 4;
?>
<div class="flexing">
<h3><?php echo $nameOfList; ?></h3>
<?php
if($editOpt) {
    $action="window.location.href=\"add.php?table=$table\"";
    echo "<button class='btn' onclick='$action'>ADD</button>";
}
?>
</div>
<?php
$table1=new createTable($con, $editOpt, $checkout, $purHist);
echo $table1->getTable($page, $pageSize, $table, $cond);
?>
 <div class="pageSystem">
        <div class="paginationButtons">
            <div class="pageNo">
                <img src="assets/images/begin.png" alt="Q">
            </div>
                <?php
                    $query=$con->prepare("SELECT * FROM $table $cond");
                    $query->execute();
                    $countOfResults=$query->rowCount();
                    $numToDisplay=5;
                    $present=$page-floor($numToDisplay/2);
                    $numberOfPages=ceil($countOfResults/$pageSize);
                    $pagesRemaining=min($numToDisplay, $numberOfPages);
                    
                    if($present<1) {
                        $present=1;
                    }
                    if($present+$pagesRemaining>$numberOfPages+1) {
                        $present=$numberOfPages+1-$pagesRemaining;
                    }
                    while($pagesRemaining!=0) {
                        if($present==$page) {
                            echo "<div class='pageNo'>
                                <img src='assets/images/clicked.png' alt='U'>
                                <span class='number'>$present</span>
                            </div>";
                        }
                        else {
                            if($checkout) {
                                $aHtml="<a href='$checkout?page=$present'>";
                            }
                            else if($editOpt===false) {
                                $aHtml="<a href='buyerDashboard.php?page=$present&cond=$cond'>";
                            }
                            else if($editOpt===0) {
                                $aHtml="<a href='search.php?searchQuery=$term&page=$present'>";
                            }
                            else {
                                $seller=$_SESSION["username"];
                                $aHtml="<a href='sellerDashboard.php?page=$present&seller=$seller'>";
                            }
                            echo "<div class='pageNo'>
                                        $aHtml
                                        <img src='assets/images/middle.png' alt='U'>
                                        <span class='number'>$present</span>
                                    </a>
                                </div>";
                        }
                        
                        $present++;
                        $pagesRemaining--;
                    }
                ?>

            <div class="pageNo">
                    <img src="assets/images/final.png" alt="Q">
            </div>
        </div>
</div>
<script src="assets/js/delete.js"></script>